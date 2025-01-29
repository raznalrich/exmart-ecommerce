import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HrDetailsI } from '../../../user/interfaces/FooterInterfaces';
import { ApiServiceService } from '../../../../services/api-service.service';

@Component({
  selector: 'app-edit-hr-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-hr-details.component.html',
  styleUrl: './edit-hr-details.component.scss'
})
export class EditHrDetailsComponent implements OnInit {
    showModal = false;
    hrForm: FormGroup;
    hrDetails: HrDetailsI | null = null;

    constructor(
      private fb: FormBuilder,
      private apiService: ApiServiceService
    ) {
      this.hrForm = this.fb.group({
        id:1,
        hrPhoneNumber: ['', [Validators.required,Validators.pattern('^[0-9]{10}$')]],
        hrEmail: ['', [Validators.required, Validators.email]],
        hrAddress: ['', Validators.required],
        hrChatEmail: ['', [Validators.email]],
        proTagLine: ['', [Validators.required, this.wordLimitValidator]]
      });
    }

    ngOnInit() {
      this.loadHrDetails();
    }

    loadHrDetails() {
      this.apiService.GetHrDetails().subscribe({
        next: (response: any) => {
          this.hrDetails = response;
          this.hrForm.patchValue({
            hrPhoneNumber: response.hrPhoneNumber,
            hrEmail: response.hrEmail,
            hrAddress: response.hrAddress,
            hrChatEmail: response.hrChatEmail,
            proTagLine: response.proTagLine
          });
        },
        error: (error) => {
          console.error('Error loading HR details:', error);
        }
      });
    }

    openModal() {
      this.showModal = true;
    }

    closeModal() {
      this.showModal = false;
    }

    wordLimitValidator(control: any) {
      const wordCount = control.value?.trim().split(/\s+/).length || 0;
      return wordCount > 25 ? { wordLimit: true } : null;
    }

    getWordCount(): number {
      const text = this.hrForm.get('proTagLine')?.value || '';
      return text.trim().split(/\s+/).filter((word: string | any[]) => word.length > 0).length;
    }

    checkWordLimit() {
      const proTagLineControl = this.hrForm.get('proTagLine');
      if (proTagLineControl) {
        proTagLineControl.updateValueAndValidity();
      }
    }

    onSubmit() {
      if (this.hrForm.valid && this.hrDetails) {
        const updatedDetails = {
          ...this.hrDetails,
          ...this.hrForm.value
        };

        this.apiService.UpdateHrDetails(updatedDetails).subscribe({
          next: () => {
            this.closeModal();
            this.loadHrDetails(); // Reload the data
          },
          error: (error) => {
            console.error('Error updating HR details:', error);
          }
        });
      }
    }

}
