import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SingleproductpageComponent } from './layout/user/pages/singleproductpage/singleproductpage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SingleproductpageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ExMart';
}
