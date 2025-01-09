import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Component, Input } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
private readonly hrEmail = 'sona.george@experionglobal.com';
CategoryList : any = [];
  constructor(public api:ApiServiceService,public router: Router){}
  ngOnInit(){
    this.api.getAllCategories().subscribe((res: any) => {
      this.CategoryList = res;
      console.log(this.CategoryList);
    });
}

openTeamsChat(): void {
  const teamsUrl = `msteams:/l/chat/0/0?users=${encodeURIComponent(this.hrEmail)}`;

  window.location.href = teamsUrl;
  setTimeout(() => {
    const webTeamsUrl = `https://teams.microsoft.com/_#/conversations/new?users=${encodeURIComponent(this.hrEmail)}`;
    window.location.href = webTeamsUrl;
  }, 1000);
}
  navigateToPolicy(type: string) {
    this.router.navigate(['/policies', type]);
  }
}
