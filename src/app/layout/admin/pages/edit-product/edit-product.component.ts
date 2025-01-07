import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent {
  @Input() product: Product | null = null; // <--- Parent passes this
  @Output() close = new EventEmitter<void>(); // <--- We emit this to parent when done

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Build a reactive form, defaulting to product’s current values (or blank)
    this.form = this.fb.group({
      name: [this.product ? this.product.name : ''],
      price: [this.product ? this.product.price : 0],
    });
  }

  onSubmit() {
    // For demonstration, just log the form. You might call an update method here.
    console.log(
      '[EditProductComponent] onSubmit fired. Form value:',
      this.form.value
    );

    // Then close the modal
    this.close.emit();
  }

  onCancel() {
    console.log('[EditProductComponent] onCancel fired');
    this.close.emit();
  }
}
