import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalService } from '../../../../global.service';

@Component({
  selector: 'app-usernavbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './usernavbar.component.html',
  styleUrl: './usernavbar.component.scss',
})
export class UsernavbarComponent {
  constructor(public cartAdd: GlobalService) {}
}
