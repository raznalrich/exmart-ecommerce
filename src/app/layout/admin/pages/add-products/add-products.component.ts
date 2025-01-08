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

  selectedFile: File | null = null;       // primary image file
  additionalFiles: File[] = [];           // additional images to upload

  showSizes = false;
  isEditMode = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchInitialData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if parent sets a product to edit
    if (changes['productToEdit'] && this.productToEdit) {
      this.isEditMode = true;
      this.populateForm(this.productToEdit);
    }
  }

  initializeForm() {
    this.addProduct = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.maxLength(500)),
      brand: new FormControl('', Validators.required),
      vendorId: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      categoryId: new FormControl('', Validators.required),
      size: new FormControl([]), // optional or mandatory, your choice
      color: new FormControl([], Validators.required),
      primaryImageUrl: new FormControl(null, Validators.required),
      weight: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      createdBy: new FormControl(2, [Validators.required, Validators.pattern(/^\d+$/)]),
      productImages: new FormControl([], Validators.required),
    });

    // Dynamically handle "showSizes" if category=20
    this.addProduct.get('categoryId')?.valueChanges.subscribe((catId) => {
      this.handleCategoryChange(catId);
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
    // e.g. show sizes if cat=20
    this.showSizes = (Number(categoryId) === 20);
  }

  populateForm(product: any) {
    this.addProduct.patchValue({
      name: product.name,
      description: product.description,
      brand: product.brand,
      vendorId: product.vendorId,
      categoryId: product.categoryId,
      size: product.size || [],
      color: product.color || [],
      primaryImageUrl: product.primaryImageUrl,
      weight: product.weight,
      price: product.price,
      createdBy: product.createdBy,
      productImages: product.productImages || [],
    });
    this.showSizes = (Number(product.categoryId) === 20);
  }

  // Check if a checkbox (size/color) is selected
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

  // Primary image
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
    console.log('Primary file selected:', this.selectedFile.name);
  }

  // Additional images
  onAdditionalFilesChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    this.additionalFiles = Array.from(input.files);

    // Replace whatever was in `productImages` with placeholders for these new images
    const placeholders = this.additionalFiles.map(() => ({ imageUrl: '' }));
    this.addProduct.patchValue({ productImages: placeholders });

    console.log(
      'Additional files selected:',
      this.additionalFiles.map((f) => f.name)
    );
  }

  // Submit => create or update
  onSubmit() {
    if (!this.addProduct.valid) {
      console.error('Form is invalid:', this.addProduct.errors);
      return;
    }

    if (this.isEditMode && this.productToEdit) {
      this.updateExistingProduct();
    } else {
      this.createNewProduct();
    }
  }

  // -------- CREATE NEW PRODUCT --------
  private createNewProduct() {
    if (!this.selectedFile) {
      console.error('No primary image selected for upload.');
      return;
    }

    // 1) Upload primary
    this.apiService
      .uploadImage(this.selectedFile)
      .pipe(
        switchMap((primaryResponse: any) => {
          const primaryImageUrl = primaryResponse.imageUrl;

          if (this.additionalFiles.length > 0) {
            // 2) Upload additional images
            const uploads = this.additionalFiles.map((f) => this.apiService.uploadImage(f));
            return forkJoin(uploads).pipe(
              map((responses: any[]) => {
                const additionalImageUrls = responses.map((r) => r.imageUrl);
                return { primaryImageUrl, additionalImageUrls };
              }),
              catchError((err) => {
                console.error('Error uploading additional images:', err);
                return of({ primaryImageUrl, additionalImageUrls: [] });
              })
            );
          } else {
            return of({ primaryImageUrl, additionalImageUrls: [] });
          }
        }),
        switchMap(({ primaryImageUrl, additionalImageUrls }) => {
          const fv = this.addProduct.value;
          const payload = {
            name: fv.name,
            description: fv.description,
            brand: fv.brand,
            vendorId: +fv.vendorId,
            categoryId: +fv.categoryId,
            SizeId: fv.size,
            ColorId: fv.color,
            primaryImageUrl: primaryImageUrl,
            weight: +fv.weight,
            price: +fv.price,
            createdBy: +fv.createdBy,
            productImages: additionalImageUrls.map((url: string) => ({
              imageUrl: url,
            })),
          };
          console.log('Create payload:', payload);
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

  // -------- UPDATE EXISTING PRODUCT --------
  private updateExistingProduct() {
    const fv = this.addProduct.value;
    const productId = this.productToEdit.id;

    // If new primary image is selected => upload it
    if (this.selectedFile) {
      this.apiService
        .uploadImage(this.selectedFile)
        .pipe(
          switchMap((primaryRes: any) => {
            const primaryImageUrl = primaryRes.imageUrl;

            if (this.additionalFiles.length > 0) {
              // upload new additional images
              const uploads = this.additionalFiles.map((f) => this.apiService.uploadImage(f));
              return forkJoin(uploads).pipe(
                map((resps: any[]) => {
                  const additionalImageUrls = resps.map((r) => r.imageUrl);
                  return { primaryImageUrl, additionalImageUrls };
                }),
                catchError((err) => {
                  console.error('Error uploading additional images:', err);
                  return of({ primaryImageUrl, additionalImageUrls: [] });
                })
              );
            } else {
              return of({ primaryImageUrl, additionalImageUrls: [] });
            }
          }),
          switchMap(({ primaryImageUrl, additionalImageUrls }) => {
            // Because user wants to replace old images with the new set,
            // if additionalFiles>0 => productImages is just that new set
            // if 0 => keep old
            const newImageArray =
              this.additionalFiles.length > 0
                ? additionalImageUrls.map((url: string) => ({ imageUrl: url }))
                : this.productToEdit.productImages || [];

            const payload = {
              id: productId,
              name: fv.name,
              description: fv.description,
              brand: fv.brand,
              vendorId: +fv.vendorId,
              categoryId: +fv.categoryId,
              SizeId: fv.size,
              ColorId: fv.color,
              primaryImageUrl, // new main image
              weight: +fv.weight,
              price: +fv.price,
              createdBy: +fv.createdBy,
              productImages: newImageArray,
            };

            console.log('Edit payload (new main file + replaced images):', payload);
            return this.apiService.updateProduct(payload.id, payload);
          })
        )
        .subscribe({
          next: (res) => {
            console.log('Product updated successfully:', res);
            this.closeModal();
          },
          error: (err) => {
            console.error('Error updating product:', err);
          },
        });
    } else {
      // No new primary image
      if (this.additionalFiles.length > 0) {
        // If user selected new additional images => upload & replace old
        forkJoin(this.additionalFiles.map((f) => this.apiService.uploadImage(f)))
          .pipe(
            switchMap((responses: any[]) => {
              const additionalImageUrls = responses.map((r) => r.imageUrl);
              const newImageArray = additionalImageUrls.map((url: string) => ({
                imageUrl: url,
              }));

              const payload = {
                id: productId,
                name: fv.name,
                description: fv.description,
                brand: fv.brand,
                vendorId: +fv.vendorId,
                categoryId: +fv.categoryId,
                SizeId: fv.size,
                ColorId: fv.color,
                // keep old main image
                primaryImageUrl: this.productToEdit.primaryImageUrl,
                weight: +fv.weight,
                price: +fv.price,
                createdBy: +fv.createdBy,
                productImages: newImageArray,
              };

              console.log('Edit payload (no new main file, replaced images):', payload);
              return this.apiService.updateProduct(payload.id, payload);
            })
          )
          .subscribe({
            next: (res) => {
              console.log('Product updated successfully:', res);
              this.closeModal();
            },
            error: (err) => {
              console.error('Error updating product:', err);
            },
          });
      } else {
        // No new primary image, no new additional images => only update text
        const payload = {
          id: productId,
          name: fv.name,
          description: fv.description,
          brand: fv.brand,
          vendorId: +fv.vendorId,
          categoryId: +fv.categoryId,
          SizeId: fv.size,
          ColorId: fv.color,
          // keep old main image
          primaryImageUrl: this.productToEdit.primaryImageUrl,
          weight: +fv.weight,
          price: +fv.price,
          createdBy: +fv.createdBy,
          // keep old images
          productImages: this.productToEdit.productImages || [],
        };

        console.log('Edit payload (no new files, no images replaced):', payload);
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
