// add-products.component.ts
import { Component, OnInit } from '@angular/core';
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
import { switchMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent implements OnInit {
  isModalVisible = true;
  addProduct!: FormGroup;

  categories: any[] = [];
  sizes: any[] = [];
  colors: any[] = [];

  selectedFile: File | null = null;
  additionalFiles: File[] = [];

  isLoading = true;
  loadError: string | null = null;

  showSizes: boolean = false;


  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Initialize the form group
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

    // Fetch categories, colors, and sizes from the API
    forkJoin({
      categories: this.apiService.getAllCategories().pipe(
        catchError((error) => {
          console.error('Error fetching categories:', error);
          this.loadError = 'Failed to load categories.';
          return of([]);
        })
      ),
      colors: this.apiService.getAllColors().pipe(
        catchError((error) => {
          console.error('Error fetching colors:', error);
          this.loadError = 'Failed to load colors.';
          return of([]);
        })
      ),
      sizes: this.apiService.getAllSizes().pipe(
        catchError((error) => {
          console.error('Error fetching sizes:', error);
          this.loadError = 'Failed to load sizes.';
          return of([]);
        })
      ),
    }).subscribe({
      next: (data) => {
        this.categories = data.categories;
        this.colors = data.colors;
        this.sizes = data.sizes;
        console.log('Loaded categories:', this.categories);
        console.log('Loaded colors:', this.colors);
        console.log('Loaded sizes:', this.sizes);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.loadError = 'An error occurred while loading data.';
        this.isLoading = false;
      },
    });

    // Subscribe to category changes to handle dynamic validators
    this.addProduct.get('categoryId')?.valueChanges.subscribe((categoryId) => {
      console.log('Category changed to:', categoryId);
      this.showSizes = Number(categoryId) === 1;

      const sizeControl = this.addProduct.get('size');
      if (this.showSizes) {
        sizeControl?.setValidators(Validators.required);
      } else {
        sizeControl?.clearValidators();
        sizeControl?.setValue([]);
      }
      sizeControl?.updateValueAndValidity();

      console.log('Show sizes:', this.showSizes);
      console.log('Size field valid status:', sizeControl?.valid);
    });
  }

  // Helper method to check if a checkbox is selected
  isSelected(controlName: string, value: number): boolean {
    const control = this.addProduct.get(controlName);
    return control?.value?.includes(value) || false;
  }

  // Handle checkbox changes for sizes and colors
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

  // Handle primary image file selection
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

  // Handle additional image file selections
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

  // Handle form submission
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
      console.error('No primary image selected for upload.');
      return;
    }

    this.apiService
      .uploadImage(this.selectedFile)
      .pipe(
        switchMap((primaryResponse: any) => {
          const primaryImageUrl = primaryResponse.imageUrl;

          if (this.additionalFiles.length > 0) {
            // Prepare upload observables for additional images
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
              }),
              catchError((error) => {
                console.error('Error uploading additional images:', error);
                return of({ primaryImageUrl, additionalImageUrls: [] });
              })
            );
          } else {
            // If no additional images, proceed with primaryImageUrl only
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
            productImages: additionalImageUrls.map((url: string) => ({
              imageUrl: url,
            })),
          };

          console.log('Payload:', payload);

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
          // Reset selectedFile and primaryImageUrl
          this.selectedFile = null;
        },
        error: (err) => {
          console.error('Error adding product:', err);
        },
      });
  }
}
