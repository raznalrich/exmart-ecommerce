import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
export interface bannerList{
  bannerId:number,
  imageUrl:string,
  productId:number,
  productImage:string,
  categoryName:string,
  productName:string,
  productPrice:string
};
@Component({
  selector: 'app-animated-product-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animated-product-carousel.component.html',
  styleUrl: './animated-product-carousel.component.scss'
})
export class AnimatedProductCarouselComponent {
  constructor(public api:ApiServiceService){}
  carouselElement(carouselElement: any) {
    throw new Error('Method not implemented.');
  }
  @ViewChild('carousel') carousel!: ElementRef;
  sliderItems:bannerList[] = [
    // {
    //   image: 'staticimages/img1.png',
    //   productImage:'staticimages/pro_tshirt.png',
    //   author: 'GARMENTS',
    //   productName: 'Tshirt',
    //   topic: '₹399',
    //   description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    // },
    // {
    //   image: 'staticimages/img2.jpg',
    //   productImage:'staticimages/pro_ear.png',
    //   author: 'APPLIANCES',
    //   productName: 'EarPods ',
    //   topic: '₹399',
    //   description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    // },
    // {
    //   image: 'staticimages/img3.png',
    //   productImage:'staticimages/pro_bag.png',
    //   author: 'STATIONARY',
    //   productName: 'BackPack ',
    //   topic: '₹399',
    //   description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    // },
    // Add more items as needed
  ]=[];

  thumbnails = this.sliderItems.map((item) => ({
    imageUrl: item.productImage,
    productName: item.productName,
    // description: 'Description',
  }));

  timeRunning = 3000;
  timeAutoNext = 7000;
  runNextAuto: any;
  timeout: any;

  ngOnInit() {
    this.autoPlaySlider();
    this.getBannerList();
  }


  showSlider(type: 'next' | 'prev') {
    const carouselElement = this.carousel.nativeElement;
    carouselElement.classList.add(type);
    if (type === 'next') {
      this.sliderItems.push(this.sliderItems.shift()!);
      this.thumbnails.push(this.thumbnails.shift()!);

    } else {
      this.sliderItems.unshift(this.sliderItems.pop()!);
      this.thumbnails.unshift(this.thumbnails.pop()!);
      // carouselElement.classList.add('prev');
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      carouselElement.classList.remove(type);
    }, this.timeRunning);

    clearTimeout(this.runNextAuto);
    this.autoPlaySlider();
  }
  getBannerList(){
this.api.getBannerList().subscribe((bannerList:any)=>{
  this.sliderItems=bannerList;
})
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
