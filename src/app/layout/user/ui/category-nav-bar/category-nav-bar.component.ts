import { Component, Input} from '@angular/core';
import { CategoryButtonComponent } from "../category-button/category-button.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../../../services/api-service.service';


@Component({
  selector: 'app-category-nav-bar',
  standalone: true,
  imports: [CategoryButtonComponent,RouterLink],
  templateUrl: './category-nav-bar.component.html',
  styleUrl: './category-nav-bar.component.scss'
})
export class CategoryNavBarComponent {
@Input() CategoryList : any;
  constructor(public api: ApiServiceService, private route: ActivatedRoute) {}

ngOnInit(){
    this.api.getAllCategories().subscribe((res: any) => {
      this.CategoryList = res;
      // console.log(this.CategoryList);
    });
}

}
