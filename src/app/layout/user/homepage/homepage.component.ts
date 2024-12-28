import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../ui/footer/footer.component";
import { UsernavbarComponent } from "../ui/usernavbar/usernavbar.component";
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, UsernavbarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
constructor(public global:GlobalService){}
ngOnInit(){
  this.global.getCartCount();
}
}
