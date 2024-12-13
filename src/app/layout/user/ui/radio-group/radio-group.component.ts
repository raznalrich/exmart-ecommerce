import { Component, Input } from '@angular/core';

interface RadioOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-radio-group',
  standalone: true,
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})
export class RadioGroupComponent {
  @Input() label!: string;
  @Input() id!: string;
  @Input() options: RadioOption[] = [];

  trackByValue(index: number, option: RadioOption): string {
    return option.value;
  }
}
