import { Component } from '@angular/core';
import { AddButtonComponent } from '../../ui/add-button/add-button.component';
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
  filteredItems: any = [...this.items];

  ngOnInit() {
    this.api.getOrderDetails().subscribe((res: any) => {
      this.items = res.map((item: any) => ({
        ...item,
        orderDate: new Date(item.orderDate).toISOString().split('T')[0],
      }));
      this.filteredItems = [...this.items];
      console.log(this.filteredItems);
    });
  }

  // items: any = [
  //   {
  //     sl_no: 1,
  //     employee_id: 'EMP001',
  //     employee_name: 'John Doe',
  //     order_id: 'ORD1001',
  //     purchase_date: '2024-12-01',
  //     order_total: 250.75,
  //   },
  //   {
  //     sl_no: 2,
  //     employee_id: 'EMP002',
  //     employee_name: 'Jane Smith',
  //     order_id: 'ORD1002',
  //     purchase_date: '2024-12-01',
  //     order_total: 120.5,
  //   },
  //   {
  //     sl_no: 3,
  //     employee_id: 'EMP003',
  //     employee_name: 'David Johnson',
  //     order_id: 'ORD1003',
  //     purchase_date: '2024-11-01',
  //     order_total: 300.0,
  //   },
  //   {
  //     sl_no: 4,
  //     employee_id: 'EMP001',
  //     employee_name: 'John Doe',
  //     order_id: 'ORD1004',
  //     purchase_date: '2024-10-01',
  //     order_total: 175.0,
  //   },
  //   {
  //     sl_no: 5,
  //     employee_id: 'EMP002',
  //     employee_name: 'Jane Smith',
  //     order_id: 'ORD1005',
  //     purchase_date: '2024-10-01',
  //     order_total: 225.99,
  //   },
  //   {
  //     sl_no: 6,
  //     employee_id: 'EMP003',
  //     employee_name: 'David Johnson',
  //     order_id: 'ORD1006',
  //     purchase_date: '2024-09-01',
  //     order_total: 145.75,
  //   },
  //   {
  //     sl_no: 7,
  //     employee_id: 'EMP004',
  //     employee_name: 'Emily Brown',
  //     order_id: 'ORD1007',
  //     purchase_date: '2024-08-01',
  //     order_total: 90.25,
  //   },
  //   {
  //     sl_no: 8,
  //     employee_id: 'EMP005',
  //     employee_name: 'Michael Scott',
  //     order_id: 'ORD1008',
  //     purchase_date: '2024-07-01',
  //     order_total: 400.5,
  //   },
  //   {
  //     sl_no: 9,
  //     employee_id: 'EMP001',
  //     employee_name: 'John Doe',
  //     order_id: 'ORD1009',
  //     purchase_date: '2024-07-01',
  //     order_total: 89.99,
  //   },
  //   {
  //     sl_no: 10,
  //     employee_id: 'EMP004',
  //     employee_name: 'Emily Brown',
  //     order_id: 'ORD1010',
  //     purchase_date: '2024-06-01',
  //     order_total: 320.4,
  //   },
  // ];

  startDate: any;
  endDate: any;

  onDateRangeSelected(dateRange: { startDate: string; endDate: string }) {
    const { startDate, endDate } = dateRange;

    if (startDate && endDate) {
      this.filteredItems = this.items.filter((item: any) => {
        try {
          const purchaseDate = new Date(item.purchase_date);
          const start = new Date(startDate);
          const end = new Date(endDate);

          if (
            isNaN(purchaseDate.getTime()) ||
            isNaN(start.getTime()) ||
            isNaN(end.getTime())
          ) {
            console.warn('Invalid date found:', { purchaseDate, start, end });
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
    console.log('Download Report');
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
