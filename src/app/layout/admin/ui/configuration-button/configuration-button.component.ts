import { Component } from '@angular/core';
import { ConfigurationTabComponent } from "../configuration-tab/configuration-tab.component";
import Modal from 'bootstrap/js/dist/modal';

@Component({
  selector: 'app-configuration-button',
  standalone: true,
  imports: [ConfigurationTabComponent],
  templateUrl: './configuration-button.component.html',
  styleUrl: './configuration-button.component.scss'
})
export class ConfigurationButtonComponent {

  private modal: Modal | undefined;

  constructor() {}

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    // Initialize the modal after view is ready
    const modalElement = document.getElementById('staticBackdrop');
    if (modalElement) {
      this.modal = new Modal(modalElement, {
        backdrop: 'static',
        keyboard: false
      });
    }
  }

  openModal() {
    this.modal?.show();
  }

  closeModal() {
    this.modal?.hide();
  }

  handleSaveChanges() {
    // Add your logic here
    console.log('Save changes clicked');
    this.closeModal();
  }

  ngOnDestroy() {
    // Clean up the modal when component is destroyed
    this.modal?.dispose();
  }
}
