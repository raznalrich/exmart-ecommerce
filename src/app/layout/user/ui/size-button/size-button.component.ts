import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../../global.service';

@Component({
  selector: 'app-size-button',
  standalone: true,
  imports: [],
  templateUrl: './size-button.component.html',
  styleUrl: './size-button.component.scss'
})
export class SizeButtonComponent {
 id: any;
  data: any;
  sizeName: any = '';

  @Input() SizeId: any;
  @Output() sizeSelected = new EventEmitter<any>();

  paramSubscription: any;
  constructor(
    public api: ApiServiceService,
    private route: ActivatedRoute,
    public global: GlobalService
  ) {}

  ngOnInit() {
 //Fetch size details
 if(this.SizeId==8){
  this.onSizeSelect();
 }
 this.api.getSizeById(this.SizeId).subscribe({
  next: (sizeData) => {
    this.sizeName = sizeData;

    console.log("Sizedata",sizeData);
    this.sizeName = this.sizeName.size;
    console.log('sizeName',this.sizeName);
  },
  error: (error) => {
    console.error('Error fetching size:', error);
  },
});
}
onSizeSelect() {
  this.sizeSelected.emit({
    id: this.SizeId,
    name: this.sizeName
  });
}
}
