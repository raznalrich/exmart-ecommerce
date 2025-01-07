
import { Component, Input } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

@Input() CategoryList : any;

  emailTemplate: string = '';
  constructor(public api:ApiServiceService,public router: Router){

  }





  ngOnInit(){
    this.api.getAllCategories().subscribe((res: any) => {
      this.CategoryList = res;
      // console.log(this.CategoryList);
    });
}




  navigateToPolicy(type: string) {
    this.router.navigate(['/policies', type]);
  }
}
