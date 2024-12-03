import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from './layout/user/homepage/homepage.component';
import { HomeStaticComponent } from './layout/user/pages/home-static/home-static.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeStaticComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ExMart';
}
