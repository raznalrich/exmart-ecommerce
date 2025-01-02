
import { products } from './../../../admin/interface/product-display.interface';
import { Component, computed, inject, Input, signal } from '@angular/core';
import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GlobalService } from '../../../../global.service';
import { ApiServiceService } from '../../../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';
import { Product } from '../../interfaces/productInterface';
import { routes } from '../../../../app.routes';

@Component({
  selector: 'app-usernavbar',
  standalone: true,
  imports: [RouterLink,CommonModule, FormsModule],
  templateUrl: './usernavbar.component.html',
  styleUrl: './usernavbar.component.scss',
})


export class UsernavbarComponent {
  @Input() cartCount :any=10;

  private productService = inject(ApiServiceService);
  private searchSubject = new Subject<string>();

  private readonly _searchTerm = signal('');
  private readonly _showingAll = signal(false);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _products = signal<Product[]>([]);
  private readonly _dropdownVisible = signal(true);

  readonly isLoading = computed(() => this._isLoading());
  readonly error = computed(() => this._error());
  readonly dropdownVisible = computed(() => this._dropdownVisible());


  readonly filteredProducts = computed(() => this._products());


  readonly visibleProducts = computed(() =>
    this._showingAll()
      ? this.filteredProducts()
      : this.filteredProducts().slice(0, 5)
  );
  get searchTerm() {
    return this._searchTerm();
  }

  showingAll = computed(() => this._showingAll());



  constructor(public cartAdd: GlobalService,public search: ApiServiceService, private router: Router) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (!term) {
          this._products.set([]);
          return of([]);
        }
        this._isLoading.set(true);
        this._error.set(null);

        return this.search.searchProducts(term).pipe(
          catchError(error => {
            console.error('Search error:', error);
            this._error.set('Failed to fetch products. Please try again.');
            return of([]);
          })
        );
      })
    ).subscribe({
      next: (products) => {
        this._products.set(products);
        this._isLoading.set(false);
        this._dropdownVisible.set(true);

      },
      error: () => {
        this._isLoading.set(false);
      }
    });
  }

  ngOnInt(){

  }
  onSearch(value: string) {
    this._searchTerm.set(value);
    this._showingAll.set(false);
    this.searchSubject.next(value);
  }

  selectProduct(product: Product) {
    this._searchTerm.set(product.name);
    this._products.set([]);
    this._showingAll.set(false);
    this._dropdownVisible.set(false);
    // this.router.navigate([`viewproduct/{id}`,product.id]);   // the is the code typed for navigating again
  }

  showAllOptions() {
    this._showingAll.set(true);
  }

  showLessOptions() {
    this._showingAll.set(false);
  }
  closeDropdown() {
    this._dropdownVisible.set(false);
  }

}


  // // Computed values
  // readonly filteredOptions = computed(() => {
  //   const term = this._searchTerm();
  //   if (!term) return [];
  //   return this.options.filter(option =>
  //     option.toLowerCase().includes(term.toLowerCase())
  //   );
  // });

  // readonly visibleOptions = computed(() => {
  //   return this._showingAll()
  //     ? this.filteredOptions()
  //     : this.filteredOptions().slice(0, 5);
  // });

  // // Getters for template
  // get searchTerm() {
  //   return this._searchTerm();
  // }

  // showingAll = computed(() => this._showingAll());

  // // Methods
  // onSearch(value: string) {
  //   this._searchTerm.set(value);
  //   this._showingAll.set(false);
  // }

  // selectOption(option: string) {
  //   this._searchTerm.set(option);
  //   this._showingAll.set(false);
  // }

  // showAllOptions() {
  //   this._showingAll.set(true);
  // }

  // showLessOptions() {
  //   this._showingAll.set(false);
  // }

