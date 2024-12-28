import {Component } from '@angular/core';
import { NgxSimpleTextEditorModule } from 'ngx-simple-text-editor';
import { EditorConfig, ST_BUTTONS } from 'ngx-simple-text-editor';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LongButtonComponent } from "../../../user/ui/long-button/long-button.component";

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
  config: EditorConfig = {
    placeholder: 'Enter the details here...',
    buttons: ST_BUTTONS,
  };
  subbtn() {
    alert("Added");
  }
}
