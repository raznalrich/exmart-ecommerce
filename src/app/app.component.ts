import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddtocartpageComponent } from './layout/user/pages/addtocartpage/addtocartpage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddtocartpageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ExMart';
}
