import { Component } from '@angular/core';

@Component({
  selector: 'app-highlighted-products',
  standalone: true,
  imports: [],
  templateUrl: './highlighted-products.component.html',
  styleUrl: './highlighted-products.component.scss'
})
export class HighlightedProductsComponent {

  mainImage = 'staticimages/pro_tshirt.png'; // Replace with your dynamic URL
  subItems = [
    {
      imageUrl: 'https://media.karousell.com/media/photos/products/2023/4/29/gildan_zipup_hoodie_1682750904_29598b39.jpg', // Replace with dynamic URLs
      altText: 'Black Polo Shirt',
    },
    {
      imageUrl: 'https://m.media-amazon.com/images/I/61eYApdaTDL._SL1100_.jpg', // Replace with dynamic URLs
      altText: 'Black Hoodie',
    },
  ];

}
