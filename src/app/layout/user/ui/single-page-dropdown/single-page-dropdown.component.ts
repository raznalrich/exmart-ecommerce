import { Component, Input } from '@angular/core';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-single-page-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './single-page-dropdown.component.html',
  styleUrl: './single-page-dropdown.component.scss'
})
export class SinglePageDropdownComponent {

  // @Input() buttonName: string = '';
  // @Input()details:any;
  arr:any;
  @Input()details:any={
title:'',
content:''
    }
  constructor(public api: ApiService) {}
  ngOnInit() {
    this.api.getProductDetails().subscribe((res: any) => {
      this.details = res;
      this.arr = this.details.dropdowns;
     console.log(this.arr);

// console.log(this.details)
    });



}

}
