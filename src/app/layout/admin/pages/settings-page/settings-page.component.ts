import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { AddNewCategoryComponent } from '../../ui/add-new-category/add-new-category.component';
import { EditPoliciesComponent } from '../../ui/edit-policies/edit-policies.component';
import { RouterLink } from '@angular/router';
import { AddBannerComponent } from '../../ui/add-banner/add-banner.component';
import { EditCategoryComponent } from '../../ui/edit-category/edit-category.component';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    AddNewCategoryComponent,
    EditPoliciesComponent,
    RouterLink,
    AddBannerComponent,
    EditCategoryComponent
],
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  // Arrays to store fetched data
  category: any[] = [];
  banners: any[] = [];

  @ViewChild(EditCategoryComponent) editCategoryComponent!: EditCategoryComponent;


  constructor(private api: ApiServiceService) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchBanners();
  }

  fetchCategories() {
    this.api.getCategory().subscribe((res: any) => {
      this.category = res;
      console.log('Fetched Categories:', this.category);
    });
  }

  fetchBanners() {
    this.api.getAllBanners().subscribe((res: any) => {
      this.banners = res;
      console.log('Fetched Banners:', this.banners);
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
    // Find the index of the updated category
    const index = this.category.findIndex(cat => cat.id === updatedCategory.id);
    if (index !== -1) {
      // Update the category in the array
      this.category[index] = updatedCategory;
      console.log('Category updated:', updatedCategory);
      alert('Category updated successfully.');
    }
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
