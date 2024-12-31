import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryButtonComponent } from './category-button.component';
import { By } from '@angular/platform-browser';

describe('CategoryButtonComponent', () => {
  let component: CategoryButtonComponent;
  let fixture: ComponentFixture<CategoryButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should have default values', () => {
      expect(component.iconSrc).toBe('');
      expect(component.label).toBe('Button');
    });

    it('should accept custom iconSrc', () => {
      const testIconSrc = 'assets/test-icon.svg';
      component.iconSrc = testIconSrc;
      fixture.detectChanges();

      const imgElement = fixture.debugElement.query(By.css('.icon'));
      expect(imgElement.attributes['src']).toBe(testIconSrc);
    });

    it('should accept custom label', () => {
      const testLabel = 'Test Button';
      component.label = testLabel;
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(By.css('.label'));
      expect(labelElement.nativeElement.textContent).toBe(testLabel);
    });
  });

  describe('DOM Elements', () => {
    it('should render container with correct class', () => {
      const container = fixture.debugElement.query(By.css('.reusable-button'));
      expect(container).toBeTruthy();
    });

    it('should render img element with correct attributes', () => {
      const imgElement = fixture.debugElement.query(By.css('img'));
      expect(imgElement).toBeTruthy();
      expect(imgElement.attributes['alt']).toBe('Button icon');
      expect(imgElement.classes['icon']).toBeTruthy();
    });

    it('should render label element with correct class', () => {
      const labelElement = fixture.debugElement.query(By.css('p'));
      expect(labelElement).toBeTruthy();
      expect(labelElement.classes['label']).toBeTruthy();
    });
  });

  describe('Component Binding', () => {
    it('should update view when inputs change', () => {
      // Arrange
      const newIcon = 'assets/new-icon.png';
      const newLabel = 'New Label';

      // Act
      component.iconSrc = newIcon;
      component.label = newLabel;
      fixture.detectChanges();

      // Assert
      const imgElement = fixture.debugElement.query(By.css('.icon'));
      const labelElement = fixture.debugElement.query(By.css('.label'));

      expect(imgElement.attributes['src']).toBe(newIcon);
      expect(labelElement.nativeElement.textContent).toBe(newLabel);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty iconSrc', () => {
      component.iconSrc = '';
      fixture.detectChanges();

      const imgElement = fixture.debugElement.query(By.css('.icon'));
      expect(imgElement.attributes['src']).toBe('');
    });

    it('should handle empty label', () => {
      component.label = '';
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(By.css('.label'));
      expect(labelElement.nativeElement.textContent).toBe('');
    });
  });
});
