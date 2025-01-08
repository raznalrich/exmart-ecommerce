// add-new-category.component.ts
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiServiceService } from '../../../../services/api-service.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-add-new-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.scss'],
})
export class AddNewCategoryComponent implements OnInit, AfterViewInit {
  // Reference to the modal element in the template
  @ViewChild('addCategoryModal') addCategoryModal!: ElementRef;

  // Bootstrap Modal instance
  private modalInstance!: Modal;

  // EventEmitter to notify parent component of a new category addition
  @Output() categoryAdded = new EventEmitter<any>();

  // Reactive form group
  categoryForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    icon: new FormControl('', { nonNullable: true }),
  });

  constructor(private api: ApiServiceService) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

  ngAfterViewInit(): void {
    // Initialize the Bootstrap modal instance after the view initializes
    this.modalInstance = new Modal(this.addCategoryModal.nativeElement, {
      backdrop: 'static', // Prevent closing by clicking outside the modal
      keyboard: true,     // Allow closing the modal with the keyboard (e.g., Esc key)
    });
  }

  // Method to open the modal
  openModal(): void {
    this.modalInstance.show();
  }

  // Method to close the modal programmatically
  closeModal(): void {
    this.modalInstance.hide();
  }

  // Method to handle form submission
  saveCategory(): void {
    if (this.categoryForm.valid) {
      console.log('Sending data:', this.categoryForm.value);

      this.api.addCategory(this.categoryForm.value).subscribe({
        next: (response) => {
          console.log('Category added successfully:', response);
          this.categoryAdded.emit(response); // Emit the new category to the parent
          this.closeModal();                  // Close the modal
          this.categoryForm.reset();          // Reset the form for future use
        },
        error: (error) => {
          console.error('Error adding category:', error);
          // Optionally, display an error message to the user
          alert('Failed to add category. Please try again.');
        },
      });
    } else {
      console.warn('Category form is invalid.');
      // Optionally, display validation errors to the user
      alert('Please fill in all required fields.');
    }
  }

  // Method to handle icon selection
  onIconSelect(iconUrl: string): void {
    this.categoryForm.patchValue({ icon: iconUrl });
  }
}
