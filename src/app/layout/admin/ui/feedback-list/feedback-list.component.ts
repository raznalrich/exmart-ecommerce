import { Component } from '@angular/core';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.scss'
})
export class FeedbackListComponent {
  arr:any;
  userFeed:any={
  name:'',
  feedback:'',
  image:''
      }
    constructor(public api: ApiService) {}
    ngOnInit() {
      this.api.getUserFeedback().subscribe((res: any) => {
        this.userFeed = res;
        this.arr = this.userFeed.employees;
       console.log(this.arr);
      console.log("Name",this.arr[0].name)
      });
  }
}
