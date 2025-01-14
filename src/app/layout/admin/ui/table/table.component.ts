import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../../../../services/api-service.service';

interface Category {
  id: number;
  categoryName: string;  // Updated to match actual data structure
  iconPath: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  constructor(public api: ApiServiceService) {}

  @Input() items: any;
  @Input() header: any;
  @Output() editProduct = new EventEmitter();

  categories: Category[] = [];
  categoryMap: Map<number, string> = new Map();

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories(): void {
    this.api.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;

        // Create a map using categoryName instead of name
        categories.forEach((category: Category) => {
          this.categoryMap.set(Number(category.id), category.categoryName);
        });

        this.loadProducts();
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  getCategoryName(categoryId: number | string): string {
    const numericCategoryId = Number(categoryId);
    const categoryName = this.categoryMap.get(numericCategoryId);
    return categoryName || 'Unknown Category';
  }

  toggleStatus(item: any) {
    this.api.toggelProductStatus(item.id).subscribe({
      next: (isActive: boolean) => {
        item.isActive = !item.isActive;
      },
      error: (err) => console.error(err),
    });
  }

  onEdit(item: any) {
    this.editProduct.emit(item);
  }

  loadProducts(): void {
    this.api.getProducts().subscribe({
      next: (products) => {
        this.items = products;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  rowKeys: string[] = [];
  icons: any = [
    {
      id: 1,
      image: 'bi bi-pen',
      bgColor: '#5DADE2',
    },
    {
      id: 2,
      image: 'bi bi-trash3',
      bgColor: '#EC7063',
    },
  ];
}
