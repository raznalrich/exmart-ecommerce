import { Component } from '@angular/core';
import { PolicyNavBarComponent } from "../../ui/policy-nav-bar/policy-nav-bar.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-policy-page',
  standalone: true,
  imports: [PolicyNavBarComponent,RouterModule],
  templateUrl: './policy-page.component.html',
  styleUrl: './policy-page.component.scss'
})
export class PolicyPageComponent {
  constructor(private router: Router) {}

  navigateToPolicy(type: string) {
    this.router.navigate(['/policies', type]);
  }
}
