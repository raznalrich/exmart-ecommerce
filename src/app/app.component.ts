import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThankyoupageComponent } from './layout/user/pages/thankyoupage/thankyoupage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ThankyoupageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ExMart';
}
