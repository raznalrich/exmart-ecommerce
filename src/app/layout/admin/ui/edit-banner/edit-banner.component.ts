import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { ApiService } from '../../../../api.service';

interface Product {
  id: number;
  name: string;
}

@Component({
  selector: 'app-edit-banner',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-banner.component.html',
  styleUrls: ['./edit-banner.component.scss'],
})
export class EditBannerComponent implements OnInit, AfterViewInit {
  @ViewChild('editBannerModal') editBannerModalRef!: ElementRef;
  private modalInstance!: Modal;

  @Input() banner!: any;
  @Output() bannerEdited = new EventEmitter<any>();

  editBannerForm!: FormGroup;
  selectedFile: File | null = null;

  // Dropdown product list
  allProducts: Product[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Initialize the reactive form
    this.editBannerForm = new FormGroup({
      bannerId: new FormControl<number | null>(null, { nonNullable: true }),
      productId: new FormControl<number | null>(null, { nonNullable: true, validators: [Validators.required] }),
      imageUrl: new FormControl('', { nonNullable: true }),
      productName: new FormControl('', { nonNullable: true })
    });

    // Load all products for the dropdown
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.modalInstance = new Modal(this.editBannerModalRef.nativeElement, {
      backdrop: 'static',
      keyboard: true,
    });
  }

  /**
   * Load all products from the server for the dropdown.
   */
  loadProducts(): void {
    this.apiService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.allProducts = products;
      },
      error: (err) => {
        console.error('Error loading products:', err);
      },
    });
  }

  openModal(): void {
    // Pre-fill the form with the banner’s data
    this.editBannerForm.setValue({
      bannerId: this.banner.bannerId,
      productId: this.banner.productId,
      imageUrl: this.banner.imageUrl ?? '',
      productName: this.banner.productName ?? ''

    });

    this.selectedFile = null; // Reset file
    this.modalInstance.show();
  }

  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide(); // Hide the modal programmatically
    }
  }


  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  saveBanner(): void {
    if (this.editBannerForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const productId = parseInt(this.editBannerForm.value.productId, 10);

    const selectedProduct = this.allProducts.find((product) => product.id === productId);

    const updatedBanner = {
      bannerId: this.editBannerForm.value.bannerId,
      productId: productId,
      imageUrl: this.editBannerForm.value.imageUrl,
      productName: selectedProduct ? selectedProduct.name : ''
    };

    console.log('Sending PUT request to update banner:', {
      url: `https://localhost:7267/api/Banner/${updatedBanner.bannerId}`,
      payload: updatedBanner,
    });

    if (this.selectedFile) {
      // If a new file is selected, upload it first
      this.apiService.uploadImage(this.selectedFile).subscribe({
        next: (uploadResponse: any) => {
          updatedBanner.imageUrl = uploadResponse.imageUrl; // Use the new image URL
          this.updateBannerOnServer(updatedBanner);
        },
        error: (err) => {
          console.error('Error uploading image:', err);
          alert('Failed to upload image. Please try again.');
        },
      });
    } else {
      // No new file selected; update the banner directly
      this.updateBannerOnServer(updatedBanner);
    }
  }

  private updateBannerOnServer(updatedBanner: any): void {
    this.apiService.updateBanner(updatedBanner.bannerId, updatedBanner).subscribe({
      next: (response) => {
        console.log('Banner updated successfully:', response);
        this.bannerEdited.emit(response); // Notify parent about the successful update
        this.closeModal(); // Close the modal
      },
      error: (error) => {
        console.error('Error updating banner:', error);
        alert(error.error?.message || 'Failed to update banner. Please try again.');
      },
    });
  }

}
