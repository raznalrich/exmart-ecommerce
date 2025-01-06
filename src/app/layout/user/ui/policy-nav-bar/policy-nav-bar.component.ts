import { Component } from '@angular/core';
import { PolicyButtonsComponent } from "../policy-buttons/policy-buttons.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy-nav-bar',
  standalone: true,
  imports: [PolicyButtonsComponent],
  templateUrl: './policy-nav-bar.component.html',
  styleUrl: './policy-nav-bar.component.scss'
})
export class PolicyNavBarComponent {
  constructor(private router: Router) {}

  navigateToPolicy(type: string) {
    this.router.navigate(['/policies', type]);
    console.log(type);

  }

}
