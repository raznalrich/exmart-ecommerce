import { Component } from '@angular/core';

@Component({
  selector: 'app-order-button',
  standalone: true,
  imports: [],
  templateUrl: './order-button.component.html',
  styleUrl: './order-button.component.scss'
})
export class OrderButtonComponent {

  isAnimating = false;

  NgOnit(){
    this.handleOrderClick();
  }


  handleOrderClick(): void {
    if (!this.isAnimating) {
      this.isAnimating = true;

      // Stop animation after 10 seconds
      setTimeout(() => {
        this.isAnimating = false;
      }, 10000);
    }
  }
}
