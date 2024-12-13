import { Component, Input } from '@angular/core';
import { FormControl, FormsModule,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() id!: string;
  @Input() type: string = 'text';
}
