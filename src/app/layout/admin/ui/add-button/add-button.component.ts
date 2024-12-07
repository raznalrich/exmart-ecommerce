import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.scss',
})
export class AddButtonComponent {
  @Input() button: any = {
    id: 1,
    icon: 'bi bi-plus-circle',
    title: 'Create New',
  };
}
