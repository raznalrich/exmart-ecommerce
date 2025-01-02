import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';

@Component({
  selector: 'app-add-new-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-new-category.component.html',
  styleUrl: './add-new-category.component.scss'
})
export class AddNewCategoryComponent {

  constructor(private api:ApiServiceService){}

  ngOnInit() {
    this.loadCategories();
  }
  loadCategories(){

  }




  categoryForm = new FormGroup({

    name: new FormControl(''),
    icon: new FormControl(''),
  });



  saveCategory() {
    if (this.categoryForm && this.categoryForm.value) {
      console.log('Sending data:', this.categoryForm.value);
      this.api.addCategory(this.categoryForm.value).subscribe({
        next: (response) => {
          console.log('Category added successfully:', response);
        },
        error: (error) => {
          console.error('Error adding category:', error);
        }
      });
    }
  }

  onIconSelect(iconUrl: string) {
  this.categoryForm.patchValue({ icon: iconUrl });
}

}
