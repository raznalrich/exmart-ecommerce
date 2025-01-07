import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../../../../services/api-service.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
onSendReplay() {
throw new Error('Method not implemented.');
}
  emailTemplate: string = '';
  constructor(public api:ApiServiceService,public router: Router){

  }



  navigateToPolicy(type: string) {
    this.router.navigate(['/policies', type]);
  }
}
