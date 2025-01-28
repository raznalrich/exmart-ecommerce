import { Component, Input} from '@angular/core';
import { GlobalService } from '../../../../global.service';
import { UserSearchbarComponent } from "../user-searchbar/user-searchbar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usernavbar',
  standalone: true,
  imports: [UserSearchbarComponent, RouterLink],
  templateUrl: './usernavbar.component.html',
  styleUrl: './usernavbar.component.scss',
})


export class UsernavbarComponent {
  @Input() cartCount :any=10;


  constructor(public cartAdd: GlobalService){}

  
}
