import { Component } from '@angular/core';
import { SearchbarComponent } from '../../ui/searchbar/searchbar.component';
import * as XLSX from 'xlsx';
import { DateRangepickerComponent } from '../../ui/date-rangepicker/date-rangepicker.component';
import { ApiServiceService } from '../../../../services/api-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-report-page',
  standalone: true,
  imports: [SearchbarComponent, DateRangepickerComponent, DatePipe],
  templateUrl: './report-page.component.html',
  styleUrl: './report-page.component.scss',
})
export class ReportPageComponent {
  constructor(public api: ApiServiceService) {}
  items: any = [];
  filteredItems: any = [];

  ngOnInit() {
    this.api.getOrderDetails().subscribe((res: any) => {
      this.items = res.map((item: any) => ({
        ...item,
        purchase_date: new Date(item.orderDate || item.purchase_date)
          .toISOString()
          .split('T')[0],
      }));
      this.filteredItems = [...this.items];
      console.log(this.filteredItems);
    });
  }

  onDateRangeSelected(dateRange: { startDate: string; endDate: string }) {
    console.log('button clicked');

    const { startDate, endDate } = dateRange;
    if (startDate && endDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      this.filteredItems = this.items.filter((item: any) => {
        try {
          const purchaseDate = new Date(item.purchase_date);
          if (!purchaseDate || isNaN(purchaseDate.getTime())) {
            console.warn('Invalid purchase date:', item.purchase_date);
            return false;
          }
          return purchaseDate >= start && purchaseDate <= end;
        } catch (error) {
          console.error('Date parsing error:', error);
          return false;
        }
      });
    } else {
      this.filteredItems = [...this.items];
    }
  }

  downloadReport() {
    // console.log('Download Report');
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.filteredItems
    );
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'payroll-report.xlsx');
  }

  worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.items, {
    header: [
      'Sl No.',
      'Employee Id',
      'Employee Name',
      'Order Id',
      'Purchase Date',
      'Order Total',
    ],
  });

  button: any = {
    id: 1,
    icon: 'bi bi-file-arrow-down',
    title: 'Report',
  };

  header: any = [
    'Sl No.',
    'Employee Id',
    'Employee Name',
    'Order Id',
    'Purchase Date',
    'Order Total',
  ];
}
