import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../../../services/api-service.service';

@Component({
  selector: 'app-policy-content',
  standalone: true,
  imports: [],
  templateUrl: './policy-content.component.html',
  styleUrl: './policy-content.component.scss'
})
export class PolicyContentComponent {

  policyContent: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiServiceService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const type = params['type'];
      this.loadPolicyContent(type);
      // console.log(type);

    });
  }

  loadPolicyContent(type: string) {
    let policyId: number;

    switch(type) {
      case 'terms':
        policyId = 1;
        break;
      case 'payment':
        policyId = 2;
        break;
      case 'shipping':
        policyId = 3;
        break;
      default:
        policyId = 1;
    }

    this.api.GetPolicyById(policyId).subscribe({
      next: (response: any) => {
        this.policyContent = response;
        console.log(this.policyContent);

      },
      error: (error) => {
        console.error('Error loading policy:', error);
      }
    });
  }
}
