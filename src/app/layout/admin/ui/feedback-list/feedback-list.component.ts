import { Component } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { FeedbackReplayComponent } from "../feedback-replay/feedback-replay.component";
import { AddNewCategoryComponent } from "../add-new-category/add-new-category.component";
import { ButtonComponent } from "../button/button.component";
import { AddressConfirmPageComponent } from "../../../user/pages/address-confirm-page/address-confirm-page.component";
import { ToggleButtonComponent } from "../toggle-button/toggle-button.component";


@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [FeedbackReplayComponent, AddNewCategoryComponent, ButtonComponent, AddressConfirmPageComponent, ToggleButtonComponent],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.scss'
})
export class FeedbackListComponent {
  // arr:any;
  // userFeed:any={
  // name:'',
  // feedback:'',
  // image:'',
  // userId:''
  //     }
  //   constructor(public api: ApiService) {}
  //   ngOnInit() {
  //     this.api.getUserFeedback().subscribe((res: any) => {
  //       this.userFeed = res;
  //       this.arr = this.userFeed.employees;
  //      console.log(this.arr);
  //     console.log("Name",this.arr[0].name)
  //     });
  // }

  feedback:any []=[]
    constructor(public api: ApiService){}

    ngOnInit(){
      this.api.getUserFeedback().subscribe((res:any)=>{
       this.feedback = res;
        console.log(this.feedback)
      })

    }
}
