import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { ApiService } from '../../../../api.service';
import { CommonModule } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

/**
 * Custom validator that checks if a form control’s value is a non‑empty array.
 */
export function nonEmptyArrayValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (Array.isArray(value) && value.length === 0) {
    return { emptyArray: true };
  }
  return null;
}

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() title = 'Modal Title';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  @Input() isEditMode = false;
  @Input() editProductDetails: any;
  @Input() productToEdit: any;

  isModalOpen = false;
  isModalVisible = false;

  addProduct!: FormGroup;

  categories: any[] = [];
  sizes: any[] = [];
  colors: any[] = [];

  selectedFile: File | null = null;
  additionalFiles: File[] = [];

  showSizes = false;
  isLoading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchInitialData();

    // Populate the form if in edit mode.
    if (this.isEditMode && this.editProductDetails) {
      this.setEditMode();
    } else {
      this.setAddMode();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productToEdit'] && this.productToEdit) {
      this.populateForm(this.productToEdit);
      this.isEditMode = true;
    }
  }

  initializeForm() {
    this.addProduct = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      brand: new FormControl('', Validators.required),
      vendorId: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      categoryId: new FormControl('', Validators.required),

      sizeId: new FormControl([]),
      colorId: new FormControl([], Validators.required),

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
      // Add our custom nonEmptyArrayValidator alongside Validators.required.
      productImages: new FormControl([], [Validators.required, nonEmptyArrayValidator]),
    });

    // Adjust size validators based on category selection.
    this.addProduct.get('categoryId')?.valueChanges.subscribe((categoryId) => {
      this.handleCategoryChange(categoryId);
    });
  }

  fetchInitialData() {
    forkJoin({
      categories: this.apiService.getAllCategories().pipe(
        catchError((error) => {
          console.error('Error fetching categories:', error);
          return of([]);
        })
      ),
      colors: this.apiService.getAllColors().pipe(
        catchError((error) => {
          console.error('Error fetching colors:', error);
          return of([]);
        })
      ),
      sizes: this.apiService.getAllSizes().pipe(
        catchError((error) => {
          console.error('Error fetching sizes:', error);
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
      },
      error: (err) => {
        console.error('Error loading data:', err);
      },
    });
  }

  setAddMode() {
    this.isModalOpen = true;
    this.isEditMode = false;
    this.productToEdit = null;
    this.editProductDetails = null;

    this.addProduct.reset({
      createdBy: 2,
      sizeId: [],
      colorId: [],
      productImages: []
    });

    this.additionalFiles = [];
    this.selectedFile = null;
    this.showSizes = false;

    const sizeControl = this.addProduct.get('sizeId');
    sizeControl?.clearValidators();
    sizeControl?.setValue([]);
    sizeControl?.updateValueAndValidity();
  }

  setEditMode() {
    this.productToEdit = this.editProductDetails;
    console.log('Product details:', this.editProductDetails);
    this.populateForm(this.editProductDetails);
  }

  handleCategoryChange(categoryId: number) {
    // For example, if category 20 requires sizes.
    this.showSizes = Number(categoryId) === 20;

    const sizeControl = this.addProduct.get('sizeId');
    if (this.showSizes) {
      sizeControl?.setValidators(Validators.required);
    } else {
      sizeControl?.clearValidators();
      sizeControl?.setValue([]);
    }
    sizeControl?.updateValueAndValidity();
  }

  populateForm(product: any) {
    this.addProduct.patchValue({
      name: product.name,
      description: product.description,
      brand: product.brand,
      vendorId: product.vendorId,
      categoryId: product.categoryId,
      sizeId: product.sizeId,
      colorId: product.colorId,
      primaryImageUrl: product.primaryImageUrl,
      weight: product.weight,
      price: product.price,
      createdBy: product.createdBy,
      // If productImages exist use them; otherwise default to an empty array.
      productImages: product.productImages && product.productImages.length ? product.productImages : []
    });

    this.handleCategoryChange(product.categoryId);
  }

  get primaryImageUrl(): string | null {
    const controlValue = this.addProduct.get('primaryImageUrl')?.value;
    return typeof controlValue === 'string' ? controlValue : null;
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
      control?.setValue(currentValue.filter((val: number) => val !== Number(checkbox.value)));
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
    this.addProduct.patchValue({ primaryImageUrl: this.selectedFile });
    console.log('File selected:', this.selectedFile.name);
  }

  onAdditionalFilesChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    this.additionalFiles = Array.from(input.files);

    // Create placeholder objects (for example, { imageUrl: '' } for each file).
    const filePlaceholders = this.additionalFiles.map(() => ({
      imageUrl: '',
    }));

    this.addProduct.patchValue({ productImages: filePlaceholders });
    console.log('Additional files selected:', this.additionalFiles.map((f) => f.name));
  }

  /**
   * Scrolls to the first invalid field in the form.
   */
  scrollToFirstInvalid() {
    // A short delay allows the error classes to be applied.
    setTimeout(() => {
      const firstInvalidControl = document.querySelector('.is-invalid') as HTMLElement;
      if (firstInvalidControl) {
        firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalidControl.focus();
      }
    }, 0);
  }

  onSubmit() {
    // If the form is invalid, mark controls as touched and scroll to the first invalid field.
    if (!this.addProduct.valid) {
      Object.keys(this.addProduct.controls).forEach(key => {
        this.addProduct.get(key)?.markAsTouched();
      });
      this.scrollToFirstInvalid();
      console.error('Form is invalid:', this.addProduct.errors);
      Object.keys(this.addProduct.controls).forEach((key) => {
        const controlErrors = this.addProduct.get(key)?.errors;
        if (controlErrors) {
          console.error(`Control ${key} is invalid:`, controlErrors);
        }
      });
      return;
    }

    this.isLoading = true;

    // Decide between creating a new product or updating an existing one.
    if (this.isEditMode && this.productToEdit) {
      this.updateExistingProduct();
    } else {
      this.createNewProduct();
    }
  }

  private updateExistingProduct() {
    const formValue = this.addProduct.value;
    const productId = this.productToEdit.id;

    if (this.selectedFile) {
      // If a new primary image has been selected.
      this.apiService
        .uploadImage(this.selectedFile)
        .pipe(
          switchMap((primaryRes: any) => {
            const primaryImageUrl = primaryRes.imageUrl;
            if (this.additionalFiles.length > 0) {
              // Upload additional images in parallel.
              const uploads = this.additionalFiles.map((file) => this.apiService.uploadImage(file));
              return forkJoin(uploads).pipe(
                map((additionalResponses: any[]) => {
                  const additionalImageUrls = additionalResponses.map((res) => res.imageUrl);
                  return { primaryImageUrl, additionalImageUrls };
                }),
                catchError((error) => {
                  console.error('Error uploading additional images:', error);
                  return of({ primaryImageUrl, additionalImageUrls: [] });
                })
              );
            } else {
              return of({ primaryImageUrl, additionalImageUrls: [] });
            }
          }),
          switchMap(({ primaryImageUrl, additionalImageUrls }) => {
            // Build the payload.
            const payload = {
              id: productId,
              name: formValue.name,
              description: formValue.description,
              brand: formValue.brand,
              vendorId: +formValue.vendorId,
              categoryId: +formValue.categoryId,
              sizeId: formValue.sizeId,
              colorId: formValue.colorId,
              primaryImageUrl: primaryImageUrl,
              weight: +formValue.weight,
              price: +formValue.price,
              createdBy: +formValue.createdBy,
              productImages: additionalImageUrls.map((url: string) => ({
                imageUrl: url,
              })),
            };

            console.log('Edit payload with new file:', payload);
            return this.apiService.updateProduct(payload.id, payload);
          })
        )
        .subscribe({
          next: (res) => {
            console.log('Product updated (with file) successfully:', res);
            this.save.emit();
            this.isLoading = false;
            this.closeModal();
          },
          error: (err) => {
            console.error('Error updating product:', err);
            this.isLoading = false;
          },
        });
    } else {
      // No new primary image selected; use the existing one.
      const payload = {
        id: productId,
        name: formValue.name,
        description: formValue.description,
        brand: formValue.brand,
        vendorId: +formValue.vendorId,
        categoryId: +formValue.categoryId,
        sizeId: formValue.sizeId,
        colorId: formValue.colorId,
        primaryImageUrl: this.productToEdit.primaryImageUrl,
        weight: +formValue.weight,
        price: +formValue.price,
        createdBy: +formValue.createdBy,
        productImages: this.productToEdit.productImages || [],
      };

      console.log('Edit payload (no new file):', payload);
      this.apiService.updateProduct(payload.id, payload).subscribe({
        next: (res) => {
          console.log('Product updated successfully:', res);
          this.save.emit();
          this.isLoading = false;
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating product:', err);
          this.isLoading = false;
        },
      });
    }
  }

  private createNewProduct() {
    // Ensure a primary image has been selected.
    if (!this.selectedFile) {
      console.error('No primary image selected for upload.');
      return;
    }

    // 1) Upload the primary image.
    this.apiService
      .uploadImage(this.selectedFile)
      .pipe(
        switchMap((primaryResponse: any) => {
          const primaryImageUrl = primaryResponse.imageUrl;

          // 2) Upload additional images if any.
          if (this.additionalFiles.length > 0) {
            const additionalUploadObservables = this.additionalFiles.map((file) =>
              this.apiService.uploadImage(file)
            );

            return forkJoin(additionalUploadObservables).pipe(
              map((additionalResponses: any[]) => {
                const additionalImageUrls = additionalResponses.map((res) => res.imageUrl);
                return { primaryImageUrl, additionalImageUrls };
              }),
              catchError((error) => {
                console.error('Error uploading additional images:', error);
                return of({ primaryImageUrl, additionalImageUrls: [] });
              })
            );
          } else {
            return of({ primaryImageUrl, additionalImageUrls: [] });
          }
        }),
        switchMap(({ primaryImageUrl, additionalImageUrls }) => {
          // 3) Build the final payload.
          const formValue = this.addProduct.value;
          const payload = {
            name: formValue.name,
            description: formValue.description,
            brand: formValue.brand,
            vendorId: +formValue.vendorId,
            categoryId: +formValue.categoryId,
            sizeId: formValue.sizeId,
            colorId: formValue.colorId,
            primaryImageUrl: primaryImageUrl,
            weight: +formValue.weight,
            price: +formValue.price,
            createdBy: +formValue.createdBy,
            productImages: additionalImageUrls.map((url: string) => ({
              imageUrl: url,
            })),
          };

          console.log('Payload (create new):', payload);
          return this.apiService.addProduct(payload);
        })
      )
      .subscribe({
        next: (res) => {
          console.log('Product added successfully:', res);
          this.save.emit();
          this.isLoading = false;
          this.closeModal();
        },
        error: (err) => {
          console.error('Error adding product:', err);
          this.isLoading = false;
        },
      });
  }

  closeModal() {
    this.isModalOpen = false;
    this.close.emit();
    this.setAddMode(); // Reset form to "add mode" upon closing.
  }

  buttonFunction() {
    this.closeModal();
  }

  saveChanges(): void {
    this.save.emit();
  }
}
