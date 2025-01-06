import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminSettingsTextEditorComponent } from '../../pages/admin-settings-text-editor/admin-settings-text-editor.component';
import { EditPoliciesTabsComponent } from "../edit-policies-tabs/edit-policies-tabs.component";

@Component({
  selector: 'app-edit-policiesapp-edit-policies',
  standalone: true,
  imports: [RouterLink, AdminSettingsTextEditorComponent, EditPoliciesTabsComponent],
  templateUrl: './edit-policies.component.html',
  styleUrl: './edit-policies.component.scss'
})
export class EditPoliciesComponent {


}
