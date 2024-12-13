import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-animated-product-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animated-product-carousel.component.html',
  styleUrl: './animated-product-carousel.component.scss'
})
export class AnimatedProductCarouselComponent {
  sliderItems = [
    {
      image: 'staticimages/img1.png',
      productImage:'staticimages/pro_tshirt.png',
      author: 'LUNDEV',
      title: 'DESIGN',
      topic: '399',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    },
    {
      image: 'staticimages/img2.jpg',
      productImage:'staticimages/pro_ear.png',
      author: 'LUNDEV',
      title: 'DESIGN ',
      topic: '399',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    },
    {
      image: 'staticimages/img3.png',
      productImage:'staticimages/pro_bag.png',
      author: 'LUNDEV',
      title: 'DESIGN ',
      topic: '399',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    },
    // Add more items as needed
  ];

  thumbnails = this.sliderItems.map((item) => ({
    image: item.productImage,
    title: item.title,
    description: 'Description',
  }));

  timeRunning = 3000;
  timeAutoNext = 7000;
  runNextAuto: any;
  timeout: any;

  ngOnInit() {
    this.autoPlaySlider();
  }

  showSlider(type: 'next' | 'prev') {
    if (type === 'next') {
      this.sliderItems.push(this.sliderItems.shift()!);
      this.thumbnails.push(this.thumbnails.shift()!);
    } else {
      this.sliderItems.unshift(this.sliderItems.pop()!);
      this.thumbnails.unshift(this.thumbnails.pop()!);
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {}, this.timeRunning);

    clearTimeout(this.runNextAuto);
    this.autoPlaySlider();
  }

  autoPlaySlider() {
    this.runNextAuto = setTimeout(() => {
      this.showSlider('next');
    }, this.timeAutoNext);
  }

  seeMore(item: any) {
    alert(`See more about: ${item.title}`);
  }

  subscribe(item: any) {
    alert(`Subscribed to: ${item.title}`);
  }
}
