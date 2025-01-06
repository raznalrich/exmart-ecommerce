import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../../api.service';
import { CommonModule } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent {
  isModalVisible = true;
  addProduct!: FormGroup;
  categories = [
    { id: 1, label: 'Garments' },
    { id: 2, label: 'Electronics' },
    { id: 3, label: 'Home Decor' },
    { id: 4, label: 'Others' },
  ];

  sizes = [
    { id: 1, label: 'XS' },
    { id: 2, label: 'S' },
    { id: 3, label: 'M' },
    { id: 4, label: 'L' },
    { id: 5, label: 'XL' },
    { id: 6, label: 'Free Size' },
  ];

  colors = [
    { id: 1, label: 'Red' },
    { id: 2, label: 'Blue' },
    { id: 3, label: 'Green' },
    { id: 4, label: 'Black' },
    { id: 5, label: 'White' },
  ];

  selectedFile: File | null = null;
  additionalFiles: File[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.addProduct = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.maxLength(500)),
      brand: new FormControl('', Validators.required),
      vendorId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      categoryId: new FormControl('', Validators.required),
      size: new FormControl([]), // Initially no validators
      color: new FormControl([], Validators.required),
      primaryImageUrl: new FormControl(null, Validators.required),
      weight: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ]),
      createdBy: new FormControl(2, [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      productImages: new FormControl([], Validators.required),
    });

    this.addProduct.get('categoryId')?.valueChanges.subscribe((categoryId) => {
      const sizeControl = this.addProduct.get('size');

      if (categoryId === 1) { // Garments category ID
        sizeControl?.setValidators(Validators.required);
      } else {
        sizeControl?.clearValidators();
      }

      sizeControl?.updateValueAndValidity();
      console.log('Size field valid status:', sizeControl?.valid);

    });
  }

  isSelected(controlName: string, value: number): boolean {
    const control = this.addProduct.get(controlName);
    return control?.value?.includes(value) || false;
  }

  onCheckboxChange(event: Event, controlName: string) {
    const checkbox = event.target as HTMLInputElement;
    const control = this.addProduct.get(controlName);
    const currentValue = control?.value || [];

    if (checkbox.checked) {
      control?.setValue([...currentValue, Number(checkbox.value)]);
    } else {
      control?.setValue(
        currentValue.filter((val: number) => val !== Number(checkbox.value))
      );
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) {
      console.error('No file selected.');
      this.selectedFile = null;
      this.addProduct.patchValue({ primaryImageUrl: null });
      return;
    }
    this.selectedFile = input.files[0];
    this.addProduct.patchValue({ primaryImageUrl: input.files[0] });
    console.log('File selected:', input.files[0].name);
  }

  onAdditionalFilesChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    this.additionalFiles = Array.from(input.files);
    const filePlaceholders = this.additionalFiles.map(() => ({ imageUrl: '' }));
    this.addProduct.patchValue({ productImages: filePlaceholders });
    console.log(
      'Additional files selected:',
      this.additionalFiles.map((f) => f.name)
    );
  }

  onSubmit() {
    if (!this.addProduct.valid) {
      console.error('Form is invalid:', this.addProduct.errors);
      Object.keys(this.addProduct.controls).forEach((key) => {
        const controlErrors = this.addProduct.get(key)?.errors;
        if (controlErrors) {
          console.error(`Control ${key} is invalid:`, controlErrors);
        }
      });
      return;
    }

    if (!this.selectedFile) {
      console.error('No file selected for upload.');
      return;
    }

    this.apiService
      .uploadImage(this.selectedFile)
      .pipe(
        switchMap((primaryResponse: any) => {
          const primaryImageUrl = primaryResponse.imageUrl;

          if (this.additionalFiles.length > 0) {
            // Prepare an array of upload observables for additional images
            const additionalUploadObservables = this.additionalFiles.map(
              (file) => this.apiService.uploadImage(file)
            );

            // Upload all additional images in parallel
            return forkJoin(additionalUploadObservables).pipe(
              map((additionalResponses: any[]) => {
                const additionalImageUrls = additionalResponses.map(
                  (res) => res.imageUrl
                );
                return { primaryImageUrl, additionalImageUrls };
              })
            );
          } else {
            // If no additional images, return only the primaryImageUrl
            return of({ primaryImageUrl, additionalImageUrls: [] });
          }
        }),
        switchMap(({ primaryImageUrl, additionalImageUrls }) => {
          const formValue = this.addProduct.value;
          const payload = {
            name: formValue.name,
            description: formValue.description,
            brand: formValue.brand,
            vendorId: +formValue.vendorId,
            categoryId: +formValue.categoryId,
            SizeId: formValue.size,
            ColorId: formValue.color,
            primaryImageUrl: primaryImageUrl,
            weight: +formValue.weight,
            price: +formValue.price,
            createdBy: +formValue.createdBy,
            productImages: additionalImageUrls.map((url) => ({
              imageUrl: url,
            })),
          };

          console.log('payload:', payload);

          // Send the payload to add the product
          return this.apiService.addProduct(payload);
        })
      )
      .subscribe({
        next: (res) => {
          console.log('Product added successfully:', res);
          this.isModalVisible = false;
          // Optionally, reset the form and additional files
          this.addProduct.reset();
          this.additionalFiles = [];
        },
        error: (err) => {
          console.error('Error adding product:', err);
        },
      });
  }
}
