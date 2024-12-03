import { Component } from '@angular/core';
import { UsernavbarComponent } from "../ui/usernavbar/usernavbar.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [UsernavbarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
