import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../../api.service';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Modal } from 'bootstrap';

interface Product {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-banner',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss'],
})
export class AddBannerComponent implements OnInit {
  private modalInstance: Modal | null = null;
  addBannerForm!: FormGroup;
  searchResults: Product[] = [];
  selectedProduct: Product | null = null;
  selectedFile: File | null = null;
  @Input() bannerCount: number = 0; // Add this line to receive banner count from parent


  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Initialize the form
    this.addBannerForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.maxLength(500)),
      productId: new FormControl(null, Validators.required),
      primaryImage: new FormControl(null, Validators.required),
    });

    // Initialize the modal
    const modalElement = document.getElementById('bannermodal');
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);

      // Add event listener for when modal is hidden
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.resetForm();
      });
    }
  }

  resetForm(): void {
    this.addBannerForm.reset();
    this.searchResults = [];
    this.selectedProduct = null;
    this.selectedFile = null;
  }

  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

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
  }

  onSearch() {
    const query = this.addBannerForm.get('title')?.value.trim();
    if (!query) {
      this.searchResults = [];
      return;
    }

    this.apiService.searchProducts(query).subscribe({
      next: (products: Product[]) => {
        this.searchResults = products;
      },
      error: (err) => {
        console.error('Error searching products:', err);
        this.searchResults = [];
      },
    });
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
    this.addBannerForm.patchValue({
      title: product.name,
      productId: product.id
    });
    this.searchResults = [];
  }

  onSubmit() {
    if (!this.addBannerForm.valid || !this.selectedFile) {
      this.markAllAsTouched();
      return;
    }

    this.apiService
      .uploadImage(this.selectedFile)
      .pipe(
        switchMap((uploadResponse: any) => {
          const payload = {
            productId: this.addBannerForm.value.productId,
            productName: this.selectedProduct?.name, // Add this line
            ImageUrl: uploadResponse.imageUrl,
          };
          return this.apiService.addBanner(payload);
        })
      )
      .subscribe({
        next: (res) => {
          console.log('Banner added successfully:', res);
          this.closeModal();
        },
        error: (err) => {
          console.error('Error adding banner:', err);
        },
      });
  }

  private markAllAsTouched() {
    Object.values(this.addBannerForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
