import { Component, Input, output } from '@angular/core';
import { AddButtonComponent } from '../../../admin/ui/add-button/add-button.component';
import { CommonModule } from '@angular/common';
import { popUp } from '../../../admin/interface/popup.interface';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss',
})
export class PopUpComponent {
  @Input() popUp: popUp = {
    buttonTitle: 'Save',
    buttonColor: '#8061c3',
    title: 'Order Confirmation',
    message: 'Do you want to confirm ?',
    cancelText: 'Cancel',
    cancelColor: 'red',
    confirmText: 'Confirm',
    confirmColor: 'green'
  };
  confirmAction = output();
  buttonFunction() {
    this.confirmAction.emit();
  }
}
