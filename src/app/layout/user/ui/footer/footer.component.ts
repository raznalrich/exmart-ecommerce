import { Component } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { Router, RouterLink } from '@angular/router';
import { AnimationStateService } from '../../../../services/animation-state.service';
import { ScrollServiceService } from '../../../../services/scroll-service.service';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

CategoryList : any[] = [];
HrDetailList: any={};
hrEmail: string = '';

constructor(public api:ApiServiceService,public router: Router,private scrollService: ScrollServiceService,private animationStateService : AnimationStateService){}

  ngOnInit(){
    this.api.getAllCategories().subscribe((res: any) => {
      this.CategoryList = res;
      console.log(this.CategoryList);
    });

    this.api.GetHrDetails().subscribe((res:any)=> {
      this.HrDetailList = res;
      this.hrEmail = this.HrDetailList.hrChatEmail || 'hr@experionglobal.com'
      console.log("Hr details Consoling API",this.HrDetailList);
    })
}

openTeamsChat(): void {
  const teamsUrl = `msteams:/l/chat/0/0?users=${encodeURIComponent(this.hrEmail)}`;
   window.open(teamsUrl, '_blank');
  setTimeout(() => {
    const webTeamsUrl = `https://teams.microsoft.com/_#/conversations/new?users=${encodeURIComponent(this.hrEmail)}`;
    window.open(webTeamsUrl, '_blank');
  }, 1000);
}
  navigateToPolicy(type: string) {
    this.router.navigate(['/policies', type])
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateToCategory(categoryId: string, categoryName: string) {
    this.router.navigate([`/home/category/`,categoryId]).then(() => {
      setTimeout(() => {
        this.scrollService.triggerScroll(categoryId);
      }, 100);
    });
  }
  navigateToUserSide(userLink: string){
    this.router.navigate([userLink])
    window.scrollTo({ top : 0, behavior:'smooth'});
  }

}
