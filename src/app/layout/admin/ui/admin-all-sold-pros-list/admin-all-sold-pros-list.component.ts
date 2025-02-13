import { Component, computed, EventEmitter, Input, Output } from '@angular/core';
import { TopProduct } from '../../interface/order.interface';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-admin-all-sold-pros-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-all-sold-pros-list.component.html',
  styleUrl: './admin-all-sold-pros-list.component.scss'
})
export class AdminAllSoldProsListComponent {
  @Input() products: TopProduct[] = [];
  @Output() closeModal = new EventEmitter<void>();
  isExporting = false;
  todaysDate : string = '';
TotalItemsSold : number = 0;
  ngOnInit() {
    const now = new Date();
    this.todaysDate = now.toLocaleString();
  }

  totalQuantity = computed(() => {
    return this.products.reduce((sum, product) => sum + product.totalQuantity, 0);
  });

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/placeholder-image.png';
  }

  async exportToExcel() {
    try {
      this.isExporting = true;

      const excelData = this.products.map((product, index) => ({
        'Sl No': index + 1,
        'Product Name': product.productName,
        'Total Count': product.totalQuantity,
        'Product ID': product.productId
      }));

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const columnWidths = [
        { wch: 8 },  // slno
        { wch: 40 }, // proName
        { wch: 15 },  // count
        { wch: 12 }, //  proId
      ];
      worksheet['!cols'] = columnWidths;
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Product Sales');
      XLSX.writeFile(workbook, `product_sales_report_${this.todaysDate}.xlsx`);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    } finally {
      this.isExporting = false;
    }
  }
}
