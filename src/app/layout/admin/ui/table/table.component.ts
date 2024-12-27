import { Component, Input } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { ButtonComponent } from '../button/button.component';
import { GlobalService } from '../../../../global.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  constructor(public api: ApiServiceService, public service: GlobalService) {}
  @Input() items: any;
  @Input() header: any;
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