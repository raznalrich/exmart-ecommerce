import { Component, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.scss',
})
export class AddButtonComponent {
  @Input() button: any = {
    id: 0,
    icon: "",
    title: "",
  };
  buttonFunction = Output();
  addItem(){
    this.buttonFunction.emit();
  }
}
