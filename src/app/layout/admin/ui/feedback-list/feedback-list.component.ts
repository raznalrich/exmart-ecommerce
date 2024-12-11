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
  employees = [
    {
      name: 'Rasnal',
      feedback: 'This is sample feedback for our ExMart website',
      image: 'assets/rasnal.jpg',
    },
    {
      name: 'Kavita',
      feedback: 'This is sample feedback for our ExMart website',
      image: 'assets/kavita.jpg',
    },
    {
      name: 'Pratheep',
      feedback: 'This is sample feedback for our ExMart website',
      image: 'assets/pratheep.jpg',
    },
    {
      name: 'Rasnal',
      feedback: 'This is sample feedback for our ExMart website',
      image: 'assets/rasnal.jpg',
    },
    {
      name: 'Kavita',
      feedback: 'This is sample feedback for our ExMart website',
      image: 'assets/kavita.jpg',
    },
    {
      name: 'Pratheep',
      feedback: 'This is sample feedback for our ExMart website',
      image: 'assets/pratheep.jpg',
    },
    {
      name: 'Rasnal',
      feedback: 'This is sample feedback for our ExMart website',
      image: 'assets/rasnal.jpg',
    },
    {
      name: 'Kavita',
      feedback: 'This is sample feedback for our ExMart website',
      image: 'assets/kavita.jpg',
    },
    {
      name: 'Pratheep',
      feedback: 'This is sample feedback for our ExMart website',
      image: 'assets/pratheep.jpg',
    },
    {
      name: 'Rasnal',
      feedback: 'This is sample feedback for our ExMart website',
      image: 'assets/rasnal.jpg',
    },
    {
      name: 'Kavita',
      feedback: 'This is sample feedback for our ExMart website',
      image: 'assets/kavita.jpg',
    },
    {
      name: 'Pratheep',
      feedback: 'This is sample feedback for our ExMart website',
      image: 'assets/pratheep.jpg',
    },
  ];

  // arr:any;
  // feedback:any={
  // name:'',
  // feedback:''
  //     }
  //   constructor(public api: ApiService) {}
  //   ngOnInit() {
  //     this.api.getUserFeedback().subscribe((res: any) => {
  //       this.feedback = res;
  //       this.arr = this.feedback.employee;
  //      console.log(this.arr);
  //     console.log(this.arr.name)
  //     });



  // }
}
