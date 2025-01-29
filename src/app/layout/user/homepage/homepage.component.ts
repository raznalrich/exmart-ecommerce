import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../ui/footer/footer.component";
import { UsernavbarComponent } from "../ui/usernavbar/usernavbar.component";
import { GlobalService } from '../../../global.service';
import { UsersidebarComponent } from '../ui/usersidebar/usersidebar.component';
import { BredcrumbComponent } from "../ui/bredcrumb/bredcrumb.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FooterComponent, UsernavbarComponent, UsersidebarComponent, BredcrumbComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
constructor(public global:GlobalService){}
ngOnInit(){
  this.global.getCartCount();
  this.global.getUserId();
}
}
