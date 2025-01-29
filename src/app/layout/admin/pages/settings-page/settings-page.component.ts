import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { AddNewCategoryComponent } from '../../ui/add-new-category/add-new-category.component';
import { EditPoliciesComponent } from '../../ui/edit-policies/edit-policies.component';
import { RouterLink } from '@angular/router';
import { AddBannerComponent } from '../../ui/add-banner/add-banner.component';
import { EditCategoryComponent } from '../../ui/edit-category/edit-category.component';
import { EditBannerComponent } from "../../ui/edit-banner/edit-banner.component";
import { ChangeDetectorRef } from '@angular/core';
import { ConfigurationTabComponent } from "../../ui/configuration-tab/configuration-tab.component";
import { ConfigurationButtonComponent } from "../../ui/configuration-button/configuration-button.component";
import { EditHrDetailsComponent } from "../../ui/edit-hr-details/edit-hr-details.component";


@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    AddNewCategoryComponent,
    EditPoliciesComponent,
    RouterLink,
    AddBannerComponent,
    EditBannerComponent,
    EditCategoryComponent,
    ConfigurationTabComponent,
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    ConfigurationButtonComponent,
    EditHrDetailsComponent

],
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  // Arrays to store fetched data
  category: any[] = [];
  banners: any[] = [];

  @ViewChild(EditCategoryComponent) editCategoryComponent!: EditCategoryComponent;
  @ViewChild(EditBannerComponent) editBannerComponent!: EditBannerComponent;



  constructor(private api: ApiServiceService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchBanners();
  }

  fetchCategories(): void {
    this.api.getCategory().subscribe({
      next: (res: any) => {
        this.category = res;
        console.log('Fetched Categories:', this.category);
        this.cdr.detectChanges(); // Ensure changes reflect dynamically
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }



  fetchBanners(): void {
    this.api.getAllBanners().subscribe({
      next: (res: any) => {
        this.banners = res;
        console.log('Fetched Banners:', this.banners);
        this.cdr.detectChanges(); // Ensure changes reflect dynamically
      },
      error: (err) => console.error('Error fetching banners:', err),
    });
  }


  // Delete Category
  deleteCategory(item: any) {
    this.api.categoryDeletion(item.id);
    // Optionally remove it from the local array
    this.category = this.category.filter(cat => cat.id !== item.id);
  }

  deleteBanner(item: any) {
    this.api.bannerDelete(item.bannerId);
    this.banners = this.banners.filter(ban => ban.bannerId !== item.bannerId);

  }

  onBannerAdded(newBanner: any) {
    // Option 1: Append the new banner to the banners array
    this.banners.push(newBanner);
    console.log('New banner added:', newBanner);

    // Option 2: Fetch the banners again from the server
    // Uncomment the line below if you prefer to re-fetch the banners
    // this.fetchBanners();
  }

  onCategoryAdded(newCategory: any) {
    // Option 1: Append the new category to the existing array
    this.category.push(newCategory);
    console.log('New category added:', newCategory);

    // Option 2: Re-fetch categories from the server
    // this.fetchCategories();
  }

  onEditCategory(category: any): void {
    // Assign the category to the EditCategoryComponent
    this.editCategoryComponent.category = category;
    // Open the edit modal
    this.editCategoryComponent.openModal();
  }

  // Handle category edited event
  onCategoryEdited(updatedCategory: any): void {
    const index = this.category.findIndex(cat => cat.id === updatedCategory.id);
    if (index !== -1) {
      this.category[index] = updatedCategory;
      console.log('Category updated:', updatedCategory);
    } else {
      console.warn('Category not found in the local array, re-fetching categories.');
      this.fetchCategories();
    }
    this.cdr.detectChanges(); // Ensure UI reflects changes
  }

  onEditBanner(bannerItem: any): void {
    // Pass the selected banner to the child component
    this.editBannerComponent.banner = bannerItem;
    // Open the modal
    this.editBannerComponent.openModal();
  }

  onBannerEdited(updatedBanner: any): void {
    const index = this.banners.findIndex(b => b.bannerId === updatedBanner.bannerId);
    if (index !== -1) {
      this.banners[index] = updatedBanner;
      console.log('Banner updated in local array:', updatedBanner);
    } else {
      console.warn('Banner not found in the local array, re-fetching banners.');
      this.fetchBanners();
    }
    this.cdr.detectChanges(); // Ensure UI reflects changes
  }


  trackById(index: number, item: any): number {
    return item.id;
  }
}
