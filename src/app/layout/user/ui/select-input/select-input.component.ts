import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss'
})
export class SelectInputComponent {
  @Input() label!: string;
  @Input() id!: string;
  @Input() placeholder: string = 'Select...';
  @Input() options: any[] = [];
}
