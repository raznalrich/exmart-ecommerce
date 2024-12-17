import { Component } from '@angular/core';
import { AddNewCategoryComponent } from "../../ui/add-new-category/add-new-category.component";
import { EditPoliciesComponent } from "../../ui/edit-policies/edit-policies.component";

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [AddNewCategoryComponent, EditPoliciesComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {

}
