import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { WebFeedbackSectionComponent } from './web-feedback-section.component';
import { ApiServiceService } from '../../../../services/api-service.service';
import { LongButtonComponent } from '../long-button/long-button.component';
import { of, throwError } from 'rxjs';
import { ApiService } from '../../../../api.service';

describe('WebFeedbackSectionComponent', () => {
  let component: WebFeedbackSectionComponent;
  let fixture: ComponentFixture<WebFeedbackSectionComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['saveUserFeedback']);

    await TestBed.configureTestingModule({
      // declarations: [
      //   WebFeedbackSectionComponent,
      //   LongButtonComponent
      // ],

      imports: [ReactiveFormsModule,WebFeedbackSectionComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    })
    .compileComponents();
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(WebFeedbackSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize the feedback form with empty feedback and default values', () => {
    expect(component.webfeedbackForm.get('feedback')?.value).toBe('');
    expect(component.webfeedbackForm.get('userId')?.value).toBe('1');
    expect(component.webfeedbackForm.get('productName')?.value).toBe('website');
  });

  it('should update feedback control when user types', () => {
    const feedbackInput = component.webfeedbackForm.get('feedback');
    const testFeedback = 'Test feedback message';

    feedbackInput?.setValue(testFeedback);

    expect(feedbackInput?.value).toBe(testFeedback);
  });

  it('should call saveUserFeedback when form is valid and submitted', fakeAsync(() => {
    const testFeedback = 'Test feedback';
    const expectedPayload = {
      feedback: testFeedback,
      userId: '1',
      productName: 'website'
    };

    apiService.saveUserFeedback.and.returnValue(of({ success: true }));

    component.webfeedbackForm.patchValue({
      feedback: testFeedback
    });

    component.submitFeedback();
    tick();

    expect(apiService.saveUserFeedback).toHaveBeenCalledWith(expectedPayload);
  }));

  it('should handle API error when submitting feedback', fakeAsync(() => {
    const testError = new Error('API Error');
    apiService.saveUserFeedback.and.returnValue(throwError(() => testError));

    spyOn(console, 'error');

    component.webfeedbackForm.patchValue({
      feedback: 'Test feedback'
    });

    component.submitFeedback();
    tick();

    expect(console.error).toHaveBeenCalledWith('Error submitting feedback:', testError);
  }));

  it('should render feedback input field', () => {
    const compiled = fixture.debugElement.nativeElement;
    const inputElement = compiled.querySelector('input[formControlName="feedback"]');

    expect(inputElement).toBeTruthy();
    expect(inputElement.getAttribute('placeholder')).toBe('enter your feedback');
  });

  it('should trigger submitFeedback when button is clicked', () => {
    spyOn(component, 'submitFeedback');
    const compiled = fixture.debugElement.nativeElement;
    const buttonComponent = compiled.querySelector('app-long-button');

    buttonComponent.click();
    fixture.detectChanges();

    expect(component.submitFeedback).toHaveBeenCalled();
  });
});
