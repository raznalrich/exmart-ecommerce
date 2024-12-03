import { Component } from '@angular/core';

@Component({
  selector: 'app-highlighted-products',
  standalone: true,
  imports: [],
  templateUrl: './highlighted-products.component.html',
  styleUrl: './highlighted-products.component.scss'
})
export class HighlightedProductsComponent {

  mainImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuLKAW3PjIGAAZDosJ0ZoTJuIY0bcAnks4BQ&s'; // Replace with your dynamic URL
  subItems = [
    {
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuLKAW3PjIGAAZDosJ0ZoTJuIY0bcAnks4BQ&s', // Replace with dynamic URLs
      altText: 'Black Polo Shirt',
    },
    {
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuLKAW3PjIGAAZDosJ0ZoTJuIY0bcAnks4BQ&s', // Replace with dynamic URLs
      altText: 'Black Hoodie',
    },
  ];

}
