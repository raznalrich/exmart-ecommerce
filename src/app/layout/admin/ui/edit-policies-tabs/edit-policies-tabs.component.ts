import { Component } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-policies-tabs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './edit-policies-tabs.component.html',
  styleUrl: './edit-policies-tabs.component.scss'
})
export class EditPoliciesTabsComponent {
  policyContent: any;
  constructor(public api:ApiServiceService,private router: Router){}

  ngOnInit(){
    this.api.GetPolicy().subscribe((res:any)=>{
    this.policyContent = res;
//    console.log(this.policyContent);
  })
  }
  openPolicy(policyId: number) {
    console.log(policyId);

    this.router.navigate([`/admin/texteditor/${policyId}`]);
  }
}
