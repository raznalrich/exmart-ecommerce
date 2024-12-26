import { Component } from '@angular/core';
import { AnimationStateService } from '../../../../services/animation-state.service';

@Component({
  selector: 'app-order-confirmation-tick-animation',
  standalone: true,
  imports: [],
  templateUrl: './order-confirmation-tick-animation.component.html',
  styleUrl: './order-confirmation-tick-animation.component.scss'
})
export class OrderConfirmationTickAnimationComponent {

  isContentVisible = false;
  animationComplete = false;

  constructor(private animationStateService : AnimationStateService) {}

  ngOnInit() {
    // Listen for the end of the tick drawing animation
    const tickElement = document.querySelector('.tick') as SVGPathElement;
    tickElement?.addEventListener('animationend', () => {
      // Set a small delay before starting the fade out
      setTimeout(() => {
        this.animationComplete = true;
        // Wait for fade out to complete before showing new content
        setTimeout(() => {
          // this.isContentVisible = true;
          this.animationStateService.setAnimationComplete();
          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500); // Match the fade-out transition duration
      }, 1000); // Small delay after tick animation completes
    });
  }
}
