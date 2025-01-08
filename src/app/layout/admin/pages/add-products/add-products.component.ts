// add-products.component.ts
import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
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
import * as bootstrap from 'bootstrap';

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
  isModalOpen = false;

  buttonFunction() {
    this.close.emit();
  }




  // closeModal(): void {
  //   this.close.emit();
  // }


  saveChanges(): void {
    this.save.emit();
  }
  @Input() productToEdit: any;

  isModalVisible = false;
  addProduct!: FormGroup;

  categories: any[] = [];
  sizes: any[] = [];
  colors: any[] = [];

  selectedFile: File | null = null;
  additionalFiles: File[] = [];

  showSizes = false;

  public isEditMode = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // 1) Initialize the form group
    this.initializeForm();

    // 2) Fetch categories, colors, and sizes from the API
    this.fetchInitialData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // If parent passes a product to edit:
    if (changes['productToEdit'] && this.productToEdit) {
      this.populateForm(this.productToEdit);
      this.isEditMode = true;
    }
  }

  initializeForm() {
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

    // Dynamically update "showSizes" if category changes
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
    this.addProduct.reset();
    this.additionalFiles = [];
    this.selectedFile = null;
    this.showSizes = false;
  }

  setEditMode(product: any) {
    this.isModalOpen = true;
    this.isEditMode = true;
    this.productToEdit = product;
    this.populateForm(product);
  }

  handleCategoryChange(categoryId: number) {
    // Use categoryId == 20 (example) to show sizes
    this.showSizes = Number(categoryId) === 20;

    const sizeControl = this.addProduct.get('size');
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
      size: product.size, // adapt if your data differs
      color: product.color, // adapt if your data differs
      primaryImageUrl: product.primaryImageUrl,
      weight: product.weight,
      price: product.price,
      createdBy: product.createdBy,
      productImages: product.productImages || [],
    });
    // Keep consistent with handleCategoryChange:
    this.showSizes = Number(product.categoryId) === 20;
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
    // Patch the form with the File object so we know it's selected
    this.addProduct.patchValue({ primaryImageUrl: this.selectedFile });
    console.log('File selected:', this.selectedFile.name);
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

    if (this.isEditMode && this.productToEdit) {
      // Handle Edit Product
      this.updateExistingProduct();
    } else {
      // Handle Add Product
      this.createNewProduct();
    }
  }

  private updateExistingProduct() {
    const formValue = this.addProduct.value;
    const productId = this.productToEdit.id;

    // If user selected a new file, upload first => then update
    if (this.selectedFile) {
      // 1) Upload the primary image
      this.apiService
        .uploadImage(this.selectedFile)
        .pipe(
          switchMap((primaryRes: any) => {
            const primaryImageUrl = primaryRes.imageUrl;
            // If additional files were selected, upload them
            if (this.additionalFiles.length > 0) {
              const uploads = this.additionalFiles.map((file) =>
                this.apiService.uploadImage(file)
              );
              return forkJoin(uploads).pipe(
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
              // No additional images
              return of({ primaryImageUrl, additionalImageUrls: [] });
            }
          }),
          switchMap(({ primaryImageUrl, additionalImageUrls }) => {
            const payload = {
              id: productId,
              name: formValue.name,
              description: formValue.description,
              brand: formValue.brand,
              vendorId: +formValue.vendorId,
              categoryId: +formValue.categoryId,
              SizeId: formValue.size,
              ColorId: formValue.color,
              primaryImageUrl: primaryImageUrl, // string from the upload
              weight: +formValue.weight,
              price: +formValue.price,
              createdBy: +formValue.createdBy,
              productImages: additionalImageUrls.map((url: string) => ({
                imageUrl: url,
              })),
            };

            console.log('Edit payload with uploaded file:', payload);
            return this.apiService.updateProduct(payload.id, payload);
          })
        )
        .subscribe({
          next: (res) => {
            console.log('Product updated (with file) successfully:', res);
            this.closeModal();
          },
          error: (err) => {
            console.error('Error updating product:', err);
          },
        });
    } else {
      // No new file selected => send existing URL
      const payload = {
        id: productId,
        name: formValue.name,
        description: formValue.description,
        brand: formValue.brand,
        vendorId: +formValue.vendorId,
        categoryId: +formValue.categoryId,
        SizeId: formValue.size,
        ColorId: formValue.color,
        primaryImageUrl: this.productToEdit.primaryImageUrl, // keep old string
        weight: +formValue.weight,
        price: +formValue.price,
        createdBy: +formValue.createdBy,
        // If needed, keep old product images or override with formValue.productImages
        productImages: this.productToEdit.productImages || [],
      };

      console.log('Edit payload (no new file):', payload);
      this.apiService.updateProduct(payload.id, payload).subscribe({
        next: (res) => {
          console.log('Product updated successfully:', res);
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating product:', err);
        },
      });
    }
  }

  private createNewProduct() {
    // Handle Add Product
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
            const additionalUploadObservables = this.additionalFiles.map((file) =>
              this.apiService.uploadImage(file)
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

          console.log('Payload (create new):', payload);
          return this.apiService.addProduct(payload);
        })
      )
      .subscribe({
        next: (res) => {
          console.log('Product added successfully:', res);
          this.closeModal();
        },
        error: (err) => {
          console.error('Error adding product:', err);
        },
      });
  }

  closeModal() {
    // const modalElement = document.getElementById('staticBackdrop');
    // if (modalElement) {
    //   const modal = bootstrap.Modal.getInstance(modalElement);
    //   modal?.hide();
    // }
    this.isModalOpen = false;
    this.setAddMode();
  }
}
