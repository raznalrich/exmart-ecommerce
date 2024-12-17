import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { GlobalService } from '../../../../global.service';
import { RouterModule } from '@angular/router';
import { AddProductsComponent } from '../../pages/add-products/add-products.component';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.scss',
})
export class AddButtonComponent {
  buttonFunction = output();

  addProduct() {
    this.buttonFunction.emit();
  }
  constructor(public productService: GlobalService) {}
  @Input() button: any = {
    id: 0,
    icon: '',
    title: '',
  };
}
