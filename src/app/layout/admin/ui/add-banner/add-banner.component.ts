import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  selectedProduct: Product | null = null;
  selectedFile: File | null = null;
  showDropdown = false;
  @Input() bannerCount: number = 0;
  @Output() bannerAdded = new EventEmitter<any>();


  @ViewChild('bannerModal') bannerModalRef!: ElementRef;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.addBannerForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.maxLength(500)),
      productId: new FormControl(null, Validators.required),
      primaryImage: new FormControl(null, Validators.required),
    });

    // Load all products on init
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    if (this.bannerModalRef) {
      this.modalInstance = new Modal(this.bannerModalRef.nativeElement);
      this.bannerModalRef.nativeElement.addEventListener('hidden.bs.modal', () => {
        this.resetForm();
      });
    }
  }

  loadProducts() {
    this.apiService.getProducts().subscribe({
      next: (products: any) => {
        this.allProducts = products;
        this.filteredProducts = [...products];
      },
      error: (err) => {
        console.error('Error loading products:', err);
      },
    });
  }

  filterProducts(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
    this.addBannerForm.patchValue({
      title: product.name,
      productId: product.id
    });
    this.showDropdown = false;
  }

  resetForm(): void {
    this.addBannerForm.reset();
    this.selectedProduct = null;
    this.selectedFile = null;
    this.filteredProducts = [...this.allProducts];
  }

  openModal(): void {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
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
            productName: this.selectedProduct?.name,
            ImageUrl: uploadResponse.imageUrl,
          };
          return this.apiService.addBanner(payload);
        })
      )
      .subscribe({
        next: (res) => {
          console.log('Banner added successfully:', res);
          this.bannerAdded.emit(res); // Emit the added banner data
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
