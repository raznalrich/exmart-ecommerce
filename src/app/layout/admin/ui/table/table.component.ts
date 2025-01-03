import { Component, Input } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { ButtonComponent } from '../button/button.component';
import { GlobalService } from '../../../../global.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  constructor(public api: ApiServiceService, public service: GlobalService) {}
  @Input() items: any;
  @Input() header: any;

  toggleStatus(item: any) {
    this.api.toggelProductStatus(item.id).subscribe({
      next: (isActive: boolean) => {
        item.isActive = !item.isActive;
        // item.isActive = isActive;
      },
      error: (err) => console.error(err),
    });
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
