import { Component } from '@angular/core';
import { ProductCarouselComponent } from '../../ui/product-carousel/product-carousel.component';
import { PolicyNavBarComponent } from "../../ui/policy-nav-bar/policy-nav-bar.component";
import { CategoryNavBarComponent } from "../../ui/category-nav-bar/category-nav-bar.component";
import { ProductDisplayingSectionComponent } from "../../ui/product-displaying-section/product-displaying-section.component";
import { HighlightedProductsComponent } from "../../ui/highlighted-products/highlighted-products.component";
import { WebFeedbackSectionComponent } from "../../ui/web-feedback-section/web-feedback-section.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-static',
  standalone: true,
  imports: [ProductCarouselComponent, PolicyNavBarComponent, CategoryNavBarComponent, ProductDisplayingSectionComponent, HighlightedProductsComponent, WebFeedbackSectionComponent,RouterOutlet],
  templateUrl: './home-static.component.html',
  styleUrl: './home-static.component.scss'
})
export class HomeStaticComponent {

}
