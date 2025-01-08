// edit-category.component.ts
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiServiceService } from '../../../../services/api-service.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit, AfterViewInit {
  // Reference to the modal element in the template
  @ViewChild('editCategoryModal') editCategoryModal!: ElementRef;

  // Bootstrap Modal instance
  private modalInstance!: Modal;

  // Input property to receive the category to edit
  @Input() category!: any;

  // EventEmitter to notify parent component of the edited category
  @Output() categoryEdited = new EventEmitter<any>();

  // Reactive form group
  categoryForm = new FormGroup({
    id: new FormControl(0, {nonNullable: true}),
    name: new FormControl('', { nonNullable: true }),
    icon: new FormControl('', { nonNullable: true }),
  });

  constructor(private api: ApiServiceService) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

  ngAfterViewInit(): void {
    // Initialize the Bootstrap modal instance after the view initializes
    this.modalInstance = new Modal(this.editCategoryModal.nativeElement, {
      backdrop: 'static', // Prevent closing by clicking outside the modal
      keyboard: true,     // Allow closing the modal with the keyboard (e.g., Esc key)
    });
  }

  // Method to open the modal
  openModal(): void {
    // Populate the form with the category data
    this.categoryForm.setValue({
      id: this.category.id,
      name: this.category.categoryName, // Replace with your actual field name
      icon: this.category.iconPath,      // Replace with your actual field name
    });
    this.modalInstance.show();
  }

  // Method to close the modal programmatically
  closeModal(): void {
    this.modalInstance.hide();
  }

  // Method to handle form submission
  saveCategory(): void {
    if (this.categoryForm.valid) {
      const updatedCategory = {
        id: this.categoryForm.value.id,
        categoryName: this.categoryForm.value.name,
        iconPath: this.categoryForm.value.icon,      
      };

      this.api.updateCategory(this.category.id, updatedCategory).subscribe({
        next: (response) => {
          console.log('Category updated successfully:', response);
          this.categoryEdited.emit(response); // Emit the updated category to the parent
          this.closeModal();                  // Close the modal
          this.categoryForm.reset();          // Reset the form for future use
        },
        error: (error) => {
          console.error('Error updating category:', error);
          alert('Failed to update category. Please try again.');
        },
      });
    } else {
      console.warn('Category form is invalid.');
      alert('Please fill in all required fields.');
    }
  }

  // Method to handle icon selection
  onIconSelect(iconUrl: string): void {
    this.categoryForm.patchValue({ icon: iconUrl });
  }
}
