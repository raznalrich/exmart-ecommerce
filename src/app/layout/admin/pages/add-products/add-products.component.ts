import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss',
})
export class AddProductsComponent {
  [x: string]: any;
  addProduct!: FormGroup;
  categories = ['Garments', 'Electronics', 'Home Decor', 'Others'];
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'Free Size'];

  ngOnInit(): void {
    this.addProduct = new FormGroup({
      images: new FormArray([], [Validators.required, Validators.maxLength(4)]),
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.maxLength(500)),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      // disabled control
      size: new FormControl({ value: '', enabled: true }),
      color: new FormControl(''),
    });
  }
  addImage(url: string) {
    if (this.images.length < 4) {
      this.images.push(new FormControl(url, Validators.required));
    }
  }
  removeImage(index: number): void {
    this.images.removeAt(index);
  }
  // Get FormArray for images
  get images(): FormArray {
    return this.addProduct.get('images') as FormArray;
  }
  onSubmit() {
    if (this.addProduct.valid) {
      console.log(this.addProduct.value);
    }
  }
}
