import { Component } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { ActivatedRoute, Route } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-odertracking-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './odertracking-table.component.html',
  styleUrl: './odertracking-table.component.scss'
})
export class OdertrackingTableComponent {
id:any;
  trackorder:any
  constructor(public api:ApiServiceService,public route:ActivatedRoute){}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getOrderDetailsById(this.id).subscribe({
      next: (res: any) => {
        this.trackorder = res;
        console.log('Order details:', this.trackorder);
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
      }
    });
  }
}
