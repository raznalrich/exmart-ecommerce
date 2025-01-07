import { Component, input } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { FeedbackReplayComponent } from "../feedback-replay/feedback-replay.component";
import { ProductFeedbackToggleComponent } from "../product-feedback-toggle/product-feedback-toggle.component";


@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [FeedbackReplayComponent, ProductFeedbackToggleComponent],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.scss'
})
export class FeedbackListComponent {

  feedback:any []=[]
    constructor(public api: ApiService){}

    ngOnInit(){
      this.api.getUserFeedback().subscribe((res:any)=>{
       this.feedback = res;
        console.log(this.feedback)
      })

    }
  }



