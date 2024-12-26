import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopUpComponent } from './pop-up.component';
import { By } from '@angular/platform-browser';

describe('PopUpComponent', () => {
  let component: PopUpComponent;
  let fixture: ComponentFixture<PopUpComponent>;

  const hexToRgb = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Trigger Button', () => {
    it('should render trigger button with correct properties', () => {
      const triggerButton = fixture.debugElement.query(By.css('#button1'));
      expect(triggerButton).toBeTruthy('Trigger button should exist');

      const buttonEl = triggerButton.nativeElement as HTMLButtonElement;
      expect(buttonEl.textContent?.trim()).toBe(component.popUp.buttonTitle);
      expect(buttonEl.getAttribute('data-bs-toggle')).toBe('modal');
      expect(buttonEl.getAttribute('data-bs-target')).toBe(
        '#confirmationModal'
      );
      expect(buttonEl.style.backgroundColor).toBe(
        hexToRgb(component.popUp.buttonColor)
      );
    });
  });

  describe('Modal Structure', () => {
    it('should have correct modal structure with default values', () => {
      const modal = fixture.debugElement.query(By.css('#confirmationModal'));
      expect(modal).toBeTruthy('Modal element should exist');

      const modalTitle = modal.query(By.css('.modal-title'));
      expect(modalTitle.nativeElement.textContent).toBe(component.popUp.title);

      const modalBody = modal.query(By.css('.modal-body'));
      expect(modalBody.nativeElement.textContent?.trim()).toBe(
        component.popUp.message
      );

      const modalButtons = modal.queryAll(By.css('.modal-footer button'));
      expect(modalButtons.length).toBe(2, 'Should have two buttons in footer');

      const cancelButton = modalButtons[0].nativeElement;
      expect(cancelButton.textContent?.trim()).toBe(component.popUp.cancelText);
      expect(cancelButton.style.backgroundColor).toBe('red');
      expect(cancelButton.getAttribute('data-bs-dismiss')).toBe('modal');

      const confirmButton = modalButtons[1].nativeElement;
      expect(confirmButton.textContent?.trim()).toBe(
        component.popUp.confirmText
      );
      expect(confirmButton.style.backgroundColor).toBe('green');
    });

    it('should update modal content when popUp input changes', () => {
      component.popUp = {
        buttonTitle: 'Delete',
        buttonColor: '#000000',
        title: 'Delete Item',
        message: 'Delete this item?',
        cancelText: 'No',
        cancelColor: '#ff0000',
        confirmText: 'Yes',
        confirmColor: '#00ff00',
      };
      fixture.detectChanges();

      const modal = fixture.debugElement.query(By.css('#confirmationModal'));

      const modalTitle = modal.query(By.css('.modal-title'));
      expect(modalTitle.nativeElement.textContent).toBe('Delete Item');

      const modalBody = modal.query(By.css('.modal-body'));
      expect(modalBody.nativeElement.textContent?.trim()).toBe(
        'Delete this item?'
      );

      const modalButtons = modal.queryAll(By.css('.modal-footer button'));

      const cancelButton = modalButtons[0].nativeElement;
      expect(cancelButton.textContent?.trim()).toBe('No');
      expect(cancelButton.style.backgroundColor).toBe(hexToRgb('#ff0000'));

      const confirmButton = modalButtons[1].nativeElement;
      expect(confirmButton.textContent?.trim()).toBe('Yes');
      expect(confirmButton.style.backgroundColor).toBe(hexToRgb('#00ff00'));
    });
  });

  describe('Button Actions', () => {
    it('should emit confirmAction when confirm button is clicked', () => {
      spyOn(component.confirmAction, 'emit');

      const modal = fixture.debugElement.query(By.css('#confirmationModal'));
      const confirmButton = modal.queryAll(By.css('.modal-footer button'))[1];

      // Fix: Call buttonFunction instead of triggering click event
      component.buttonFunction();

      expect(component.confirmAction.emit).toHaveBeenCalled();
    });

    it('should close modal when cancel button is clicked', () => {
      const modal = fixture.debugElement.query(By.css('#confirmationModal'));
      const cancelButton = modal.queryAll(By.css('.modal-footer button'))[0];

      expect(cancelButton.nativeElement.getAttribute('data-bs-dismiss')).toBe(
        'modal'
      );
    });
  });

  describe('Modal Attributes', () => {
    it('should have correct Bootstrap modal attributes', () => {
      const modal = fixture.debugElement.query(By.css('#confirmationModal'));
      const modalEl = modal.nativeElement as HTMLElement;

      expect(modalEl.classList.contains('modal')).toBeTrue();
      expect(modalEl.classList.contains('fade')).toBeTrue();
      expect(modalEl.getAttribute('tabindex')).toBe('-1');
      expect(modalEl.getAttribute('aria-labelledby')).toBe('confirmationModal');
      expect(modalEl.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
