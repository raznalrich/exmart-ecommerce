import { Component } from '@angular/core';
import { AddNewCategoryComponent } from "../../ui/add-new-category/add-new-category.component";
import { EditPoliciesComponent } from "../../ui/edit-policies/edit-policies.component";
import { RouterLink } from '@angular/router';
import { ApiServiceService } from '../../../../services/api-service.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [AddNewCategoryComponent, EditPoliciesComponent,RouterLink],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {



  // Get all categories from API
  category:any []=[]
  constructor(public api:ApiServiceService){}

  ngOnInit(){
    this.api.getCategory().subscribe((res:any)=>{
     this.category = res;
      console.log(this.category)
    })

  }





}
