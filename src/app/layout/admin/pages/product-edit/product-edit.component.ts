import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../../../../api.service';
import { GlobalService } from '../../../../global.service';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'], // note the 's' here
})
export class ProductEditComponent implements OnInit {
  @Input() product: any | null = null;
  @Output() close = new EventEmitter<void>();

  editProduct!: FormGroup;

  categories: any[] = [];
  sizes: any[] = [];
  colors: any[] = [];

  selectedFile: File | null = null;
  additionalFiles: File[] = [];

  isLoading = true;
  loadError: string | null = null;
  showSizes = false;

  constructor(
    private apiService: ApiService,
    public globalService: GlobalService,
    private fb: FormBuilder
  ) {
    // console.log('[ProductEditComponent] constructor. GlobalService:', this.globalService.selectedProduct);
  }

  ngOnInit(): void {
    // 1) fetch categories/colors/sizes
    this.fetchSelections();

    // 2) build the form
    this.buildForm();

    // 3) if you want dynamic "showSizes" logic:
    this.editProduct.get('categoryId')?.valueChanges.subscribe((catId) => {
      this.showSizes = catId === 1;
    });
  }

  fetchSelections(): void {
    // Same logic as your old "forkJoin" approach:
    // If your calls differ, adapt accordingly
    this.apiService.getAllCategories().subscribe({
      next: (cats) => {
        this.categories = cats;
        this.isLoading = false;
      },
      error: (err) => {
        this.loadError = 'Failed to load categories.';
        console.error(err);
      },
    });
    // Do the same for getAllColors, getAllSizes...
  }

  buildForm(): void {
    // Convert your "size" and "color" to FormArrays if needed
    // If product is null, default to []
    const sizeArray = this.fb.array(this.product?.size || []);
    const colorArray = this.fb.array(this.product?.color || []);
    const imagesArray = this.fb.array(this.product?.productImages || []);

    this.editProduct = this.fb.group({
      name: [this.product?.name || ''],
      description: [this.product?.description || ''],
      brand: [this.product?.brand || ''],
      categoryId: [this.product?.categoryId || 0],
      size: sizeArray,
      color: colorArray,
      primaryImageUrl: [this.product?.primaryImageUrl || ''],
      weight: [this.product?.weight || 0],
      price: [this.product?.price || 0],
      productImages: imagesArray,
    });
  }

  onSubmit() {
    console.log('[ProductEditComponent] onSubmit fired. Value:', this.editProduct.value);
    // Optionally, call an update endpoint here
    // this.apiService.updateProduct(this.editProduct.value).subscribe(...);

    this.close.emit(); // Let the parent know we're done
  }

  onCancel() {
    console.log('[ProductEditComponent] onCancel fired');
    this.close.emit();
  }
}
