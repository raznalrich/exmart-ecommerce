import { Component, Input } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  constructor(public api: ApiServiceService) {}
  @Input() items: any = {
    id: 0,
    image: '',
    category: '',
    product: '',
    price: 0,
  };

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
