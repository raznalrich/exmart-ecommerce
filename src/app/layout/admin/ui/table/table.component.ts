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
  toggleStates: { [key: number]: boolean } = {};

  ngOnInit(): void {
    this.items.forEach((items: any) => {
      this.toggleStates[items.id] = false;
    });
  }

  toggleStatus(isActive: any) {
    // this.toggleStates[itemId] = !this.toggleStates[itemId];
    // console.log(
    //   `Toggled status for item ${itemId}: ${
    //     this.toggleStates[itemId] ? 'Active' : 'Inactive'
    //   }`
    // );
  }
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
