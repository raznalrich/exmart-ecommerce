import { Component } from '@angular/core';
import { UsersidebarComponent } from "../../ui/usersidebar/usersidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [UsersidebarComponent,RouterOutlet],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent {

}
