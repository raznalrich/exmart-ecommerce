import { Component } from '@angular/core';
import { OrderlistTableComponent } from '../../ui/orderlist-table/orderlist-table.component';
import { ApiServiceService } from '../../../../services/api-service.service';
import { SearchbarComponent } from '../../ui/searchbar/searchbar.component';
import { AdminValuesDisplayingButtonComponent } from '../../ui/admin-values-displaying-button/admin-values-displaying-button.component';
import { DateRangepickerComponent } from '../../ui/date-rangepicker/date-rangepicker.component';
import { ReactiveFormsModule } from '@angular/forms';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    OrderlistTableComponent,
    ReactiveFormsModule,
    SearchbarComponent,
    AdminValuesDisplayingButtonComponent,
    DateRangepickerComponent,
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
  orderlist: any[] = [];
  filteredItems: any[] = [];
  searchPlaceholder: string = 'Search Order Item/Product';
  constructor(public api: ApiServiceService) {}

  ngOnInit() {
    this.api.getOrderList().subscribe((res: any) => {
      this.orderlist = res.map((item: any) => ({
        ...item,
        orderDate: new Date(item.orderDate).toISOString(),
      }));
      this.filteredItems = [...this.orderlist];
      console.log('filtered list', this.filteredItems);
    });
  }

  onSearch(searchTerm: string) {
    const term = searchTerm.trim();
    if (!term) {
      this.filteredItems = [...this.orderlist];
      return;
    }
    // console.log('Search Term:', term);
    const regex = new RegExp(`^${term}$`, 'i');
    this.filteredItems = this.orderlist.filter((item: any) => {
      const orderId =
        item.orderItemId !== undefined ? item.orderItemId.toString() : '';
      const productName = item.productName
        ? item.productName.toLowerCase()
        : '';
      const status = item.status !== undefined ? item.status.toString() : '';

      return regex.test(orderId) || productName.includes(term.toLowerCase()) || regex.test(status);
    });

    if (this.filteredItems.length === 0) {
      console.warn('No matching results found for:', term);
    }
  }

  onDateRangeSelected(dateRange: { startDate: string; endDate: string }) {
    const { startDate, endDate } = dateRange;

    if (startDate && endDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      this.filteredItems = this.orderlist.filter((item) => {
        try {
          const orderDate = new Date(item.orderDate);
          if (!orderDate || isNaN(orderDate.getTime())) {
            console.warn('Invalid order date:', item.orderDate);
            return false;
          }
          // Fixed date range comparison
          return orderDate >= start && orderDate <= end;
        } catch (error) {
          console.error('Date parsing error:', error);
          return false;
        }
      });
    } else {
      this.filteredItems = [...this.orderlist];
    }
  }

  loadOrders() {
    this.api.getOrderList().subscribe((res: any) => {
      this.orderlist = res.map((item: any) => ({
        ...item,
        orderDate: new Date(item.orderDate).toISOString(),
      }));
      this.filteredItems = [...this.orderlist];
      console.log('filtered list', this.filteredItems);
    });
  }

  async onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target?.files?.[0];

    if (!file) return;

    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(await file.arrayBuffer());
      const worksheet = workbook.getWorksheet(1);

      if (!worksheet) {
        console.error('No worksheet found');
        return;
      }

      const orders =
        worksheet
          .getRows(2, worksheet.rowCount - 1)
          ?.map(
            (row) =>
              row && {
                orderItemId: row.getCell(1).value,
                productStatusId: this.getStatusNumber(
                  row.getCell(4).value as string
                ),
              }
          )
          .filter((order) => order && order.orderItemId) ?? [];

      // Track successful updates
      let hasUpdates = false;

      await Promise.all(
        orders.map(async (order) => {
          try {
            const response = await firstValueFrom(
              this.api.updateOrderStatus(order)
            );
            console.log(`Order updated: ${order.orderItemId}`, response);

            hasUpdates = true;
          } catch (error) {
            console.error(`Error updating order: ${order.orderItemId}`, error);
          }
        })
      );
      if (hasUpdates) {
        this.loadOrders();
      }
    } catch (error) {
      console.error('Error reading Excel file:', error);
    }
  }

  private getStatusNumber(status: string): number {
    const statusMap: { [key: string]: number } = {
      pending: 1,
      shipped: 2,
      delivered: 3,
    };
    return statusMap[status.toLowerCase()] || 1;
  }

  async downloadReport() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Orders');

    worksheet.columns = [
      { header: 'Order Item Id', key: 'orderItemId', width: 15 },
      { header: 'Date', key: 'orderDate', width: 20 },
      { header: 'Product', key: 'productName', width: 25 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Quantity', key: 'quantity', width: 10 },
    ];

    const data = this.filteredItems.map((order) => ({
      orderItemId: order.orderItemId,
      orderDate: new Date(order.orderDate).toLocaleDateString(),
      productName: order.productName,
      status:
        ['Pending', 'Shipped', 'Delivered'][order.status - 1] || 'Pending',
      amount: order.amount.toFixed(2),
      quantity: order.quantity,
    }));
    // console.log("this is filtered data",data);
    data.forEach((row) => worksheet.addRow(row));

    const dataValidation = {
      type: 'list' as const,
      allowBlank: false,
      formulae: ['"Pending,Shipped,Delivered"'],
      showErrorMessage: true,
      errorTitle: 'Invalid Input',
      error:
        'Please select a value from the dropdown: Pending, Shipped, or Delivered.',
    };

    const statusColumn = worksheet.getColumn('status');
    statusColumn.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
      if (rowNumber > 1) {
        // Skip header row
        cell.dataValidation = dataValidation;
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'Orders_With_Validation.xlsx');
  }
}
