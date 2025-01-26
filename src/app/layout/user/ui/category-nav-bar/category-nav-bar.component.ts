import { Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import { CategoryButtonComponent } from "../category-button/category-button.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../../../services/api-service.service';
import { ScrollServiceService } from '../../../../services/scroll-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-category-nav-bar',
  standalone: true,
  imports: [CategoryButtonComponent,RouterLink],
  templateUrl: './category-nav-bar.component.html',
  styleUrl: './category-nav-bar.component.scss'
})
export class CategoryNavBarComponent implements OnInit, OnDestroy {

  private scrollSubscription!: Subscription;

    @Input() CategoryList : any;

  constructor(public api: ApiServiceService, private route: ActivatedRoute,
    private elementRef: ElementRef,private scrollService: ScrollServiceService) {}

ngOnInit(){
    this.api.getAllCategories().subscribe((res: any) => {
      this.CategoryList = res;
      // console.log(this.CategoryList);
    });
    this.scrollSubscription = this.scrollService.scrollAction$.subscribe(categoryId => {
      this.scrollToComponent();
    });
}
ngOnDestroy() {
  if (this.scrollSubscription) {
    this.scrollSubscription.unsubscribe();
  }
}

private scrollToComponent() {
  this.elementRef.nativeElement.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

}
