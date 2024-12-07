import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-policy-buttons',
  standalone: true,
  imports: [],
  templateUrl: './policy-buttons.component.html',
  styleUrl: './policy-buttons.component.scss'
})
export class PolicyButtonsComponent {

  @Input() iconSrc: string = '';
  @Input() title: string = 'not added';
  @Input() description: string = '<->';


}
