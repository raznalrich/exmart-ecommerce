import { Component } from '@angular/core';
import { AddOfficeAdressComponent } from "../add-office-adress/add-office-adress.component";

@Component({
  selector: 'app-configuration-tab',
  standalone: true,
  imports: [AddOfficeAdressComponent],
  templateUrl: './configuration-tab.component.html',
  styleUrl: './configuration-tab.component.scss'
})
export class ConfigurationTabComponent {

}
