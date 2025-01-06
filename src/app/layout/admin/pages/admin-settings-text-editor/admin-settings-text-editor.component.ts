import {Component } from '@angular/core';
import { NgxSimpleTextEditorModule } from 'ngx-simple-text-editor';
import { EditorConfig, ST_BUTTONS } from 'ngx-simple-text-editor';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { LongButtonComponent } from "../../../user/ui/long-button/long-button.component";
import { ApiServiceService } from '../../../../services/api-service.service';

@Component({
  selector: 'app-admin-settings-text-editor',
  standalone: true,
  imports: [NgxSimpleTextEditorModule, FormsModule, RouterOutlet, LongButtonComponent],
  templateUrl: './admin-settings-text-editor.component.html',

  styleUrl: './admin-settings-text-editor.component.scss'
})
export class AdminSettingsTextEditorComponent {
  title = 'texteditor';
  content: string = '';
  currentPolicyId: number = 0;
  policyHeading: string = '';
  config: EditorConfig = {
    placeholder: 'Enter the details here...',
    buttons: ST_BUTTONS,
  };
  policyContent: string | undefined;

  constructor(public api:ApiServiceService,private route: ActivatedRoute,private router: Router){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.currentPolicyId = id;
        this.loadPolicy(id);
      }
    });
  }

  loadPolicy(id: number) {
    this.api.GetPolicyById(id).subscribe((res: any) => {
      this.content = res.tndCcontent;
      this.policyHeading = res.tndCheading;
    });
  }

  subbtn() {
    if (this.currentPolicyId) {
      console.log('Content being sent:', this.content);
      this.api.UpdatePolicy(this.currentPolicyId, this.content).subscribe({
        next: (response) => {
          console.log('Success response:', response);
          alert('Policy updated successfully');
          this.router.navigate(['/admin/settings']); // Navigate back to policies list
        },
        error: (error) => {
          alert('Error Updating policy');
          console.error('Error:', error);
        }
      });
    }
  }
}
