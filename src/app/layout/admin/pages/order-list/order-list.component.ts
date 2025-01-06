import { Component } from '@angular/core';
import { OrderlistTableComponent } from '../../ui/orderlist-table/orderlist-table.component';
import { ApiServiceService } from '../../../../services/api-service.service';
import { SearchbarComponent } from '../../ui/searchbar/searchbar.component';
import { AdminValuesDisplayingButtonComponent } from '../../ui/admin-values-displaying-button/admin-values-displaying-button.component';
import { DateRangepickerComponent } from '../../ui/date-rangepicker/date-rangepicker.component';
import { ReactiveFormsModule } from '@angular/forms';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

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
  constructor(public api: ApiServiceService) {}
  ngOnInit() {
    this.api.getOrderList().subscribe((res: any) => {
      this.orderlist = res;
      console.log('orderlist', this.orderlist);
    });
  }
  downloadReport() {
    // Step 1: Create Workbook and Worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Orders');

    // Step 2: Add Columns (Headers)
    worksheet.columns = [
      { header: 'Order Item Id', key: 'orderItemId', width: 15 },
      { header: 'Date', key: 'orderDate', width: 20 },
      { header: 'Product', key: 'productName', width: 25 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Quantity', key: 'quantity', width: 10 },
    ];

    // Step 3: Map API Data to Columns
    const data = this.orderlist.map((order) => ({
      orderItemId: order.orderItemId,
      orderDate: new Date(order.orderDate).toLocaleDateString(),
      productName: order.productName,
      status:
        order.status === 1
          ? 'Pending'
          : order.status === 2
          ? 'Shipped'
          : 'Delivered',
      amount: order.amount.toFixed(2),
      quantity: order.quantity,
    }));

    data.forEach((row) => worksheet.addRow(row));

    // Step 4: Apply Data Validation to the "Status" Column
    const startRow = 2; // Rows start at 2 because row 1 contains headers
    const endRow = startRow + data.length - 1; // End row for data
    const validationRange = `G${startRow}:G${endRow}`; // "Status" is the 7th column (G)

    worksheet
      .getColumn('status')
      .eachCell({ includeEmpty: true }, (cell, rowNumber) => {
        if (rowNumber >= startRow && rowNumber <= endRow) {
          cell.dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: ['"Pending,Shipped,Delivered"'],
            showErrorMessage: true,
            errorTitle: 'Invalid Input',
            error:
              'Please select a value from the dropdown: Pending, Shipped, or Delivered.',
          };
        }
      });

    // Step 5: Save the Workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer]), 'Orders_With_Validation.xlsx');
    });
  }
  uploadReport() {
    throw new Error('Method not implemented.');
  }
}
