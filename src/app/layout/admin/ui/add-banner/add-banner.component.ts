import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../../api.service'; // Adjust the path as needed
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';

interface Product {
  id: number;
  name: string;
  // Add other product properties as needed
}

@Component({
  selector: 'app-add-banner',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss'],
})
export class AddBannerComponent implements OnInit {
  // Flag to control modal visibility
  isModalVisible = true;

  // Form group for the banner
  addBannerForm!: FormGroup;

  // Search results
  searchResults: Product[] = [];

  // Selected product
  selectedProduct: Product | null = null;

  // Selected primary image
  selectedFile: File | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Initialize the form
    this.addBannerForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.maxLength(500)),
      productId: new FormControl(null, Validators.required), // Assuming banner is linked to a product
      primaryImage: new FormControl(null, Validators.required),
      // Add other banner-specific fields if necessary
    });
  }

  /**
   * Handles file selection for the primary image upload.
   */
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) {
      console.error('No file selected.');
      this.selectedFile = null;
      this.addBannerForm.patchValue({ primaryImage: null });
      return;
    }
    this.selectedFile = input.files[0];
    this.addBannerForm.patchValue({ primaryImage: input.files[0] });
    console.log('Primary image selected:', input.files[0].name);
  }

  /**
   * Handles the search form submission.
   */
  onSearch() {
    const query = this.addBannerForm.get('title')?.value.trim();
    if (!query) {
      console.error('Search query is empty.');
      return;
    }

    this.apiService.searchProducts(query).subscribe({
      next: (products: Product[]) => {
        this.searchResults = products;
        console.log('Search results:', products);
      },
      error: (err) => {
        console.error('Error searching products:', err);
      },
    });
  }

  /**
   * Selects a product from the search results.
   */
  selectProduct(product: Product) {
    this.selectedProduct = product; // Store the selected product
    this.addBannerForm.patchValue({ productId: product.id });
    this.searchResults = []; // Clear search results after selection
    console.log('Selected product ID:', product.id);
  }

  /**
   * Handles form submission to add a banner.
   */
  onSubmit() {
    if (!this.addBannerForm.valid) {
      console.error('Form is invalid:', this.addBannerForm.errors);
      this.markAllAsTouched();
      return;
    }

    if (!this.selectedFile) {
      console.error('No primary image selected for upload.');
      this.addBannerForm.get('primaryImage')?.markAsTouched();
      return;
    }

    // Prepare the payload
    const formValue = this.addBannerForm.value;

    // First, upload the primary image
    this.apiService
      .uploadImage(this.selectedFile)
      .pipe(
        switchMap((uploadResponse: any) => {
          const primaryImageUrl = uploadResponse.imageUrl;

          // Prepare the banner payload
          const payload = {
            // title: formValue.title,
            // description: formValue.description,
            productId: formValue.productId,
            ImageUrl: primaryImageUrl,
            // Add other banner-specific fields here
          };

          console.log('Banner payload:', payload);

          // Submit the banner payload to addBanner
          return this.apiService.addBanner(payload);
        })
      )
      .subscribe({
        next: (res) => {
          console.log('Banner added successfully:', res);
          this.isModalVisible = false;
          this.addBannerForm.reset();
          this.selectedProduct = null;
          this.selectedFile = null;
        },
        error: (err) => {
          console.error('Error adding banner:', err);
        },
      });
  }

  /**
   * Marks all form controls as touched to trigger validation messages.
   */
  private markAllAsTouched() {
    Object.values(this.addBannerForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  /**
   * Closes the modal and resets the form.
   */
  closeModal() {
    this.isModalVisible = false;
    this.addBannerForm.reset();
    this.searchResults = [];
    this.selectedProduct = null; // Reset the selected product
    this.selectedFile = null;
  }
}
