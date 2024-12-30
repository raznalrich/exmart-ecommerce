import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalService } from '../../../../global.service';
import { ApiServiceService } from '../../../../services/api-service.service';

@Component({
  selector: 'app-usernavbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './usernavbar.component.html',
  styleUrl: './usernavbar.component.scss',
})
export class UsernavbarComponent {
  constructor(public cartAdd: GlobalService) {}
  @Input() cartCount :any=10;


}
