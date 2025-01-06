import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { AddNewCategoryComponent } from '../../ui/add-new-category/add-new-category.component';
import { EditPoliciesComponent } from '../../ui/edit-policies/edit-policies.component';
import { RouterLink } from '@angular/router';
import { AddBannerComponent } from '../../ui/add-banner/add-banner.component';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    AddNewCategoryComponent,
    EditPoliciesComponent,
    RouterLink,
    AddBannerComponent
  ],
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  // Arrays to store fetched data
  category: any[] = [];
  banners: any[] = [];

  constructor(private api: ApiServiceService) {}

  ngOnInit(): void {
    this.api.getCategory().subscribe((res: any) => {
      this.category = res;
      console.log('Fetched Categories:', this.category);
    });

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
}
