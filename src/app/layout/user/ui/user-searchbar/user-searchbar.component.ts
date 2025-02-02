import { Component, computed, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { ActivatedRoute, NavigationExtras, NavigationStart, Router, RouterLink } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, of, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { Product } from '../../interfaces/productInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-searchbar',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './user-searchbar.component.html',
  styleUrl: './user-searchbar.component.scss'
})
export class UserSearchbarComponent {
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

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

  constructor(public search: ApiServiceService, private router: Router) {}

  ngOnInit() {
    this.setupSearchSubscription();
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.clearSearch();
        }
      });
  }

  private setupSearchSubscription() {
    this.searchSubject
      .pipe(
        takeUntil(this.destroy$),
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
      )
      .subscribe({
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

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
  this.clearSearch();
}
private clearSearch() {
  this._searchTerm.set('');
  this._products.set([]);
  this._showingAll.set(false);
  this._dropdownVisible.set(false);
  this._isLoading.set(false);
  this._error.set(null);
}
}
