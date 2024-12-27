import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AdminValuesDisplayingButtonComponent } from './admin-values-displaying-button.component';

describe('AdminValuesDisplayingButtonComponent', () => {
  let component: AdminValuesDisplayingButtonComponent;
  let fixture: ComponentFixture<AdminValuesDisplayingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminValuesDisplayingButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminValuesDisplayingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct icon source', () => {
    component.iconSrc = 'test-icon.png';
    fixture.detectChanges();
    const imgElement = fixture.debugElement.query(By.css('.icon img')).nativeElement;
    expect(imgElement.src).toContain('test-icon.png');
  });

  it('should display the correct count', () => {
    component.count = 42;
    fixture.detectChanges();
    const countElement = fixture.debugElement.query(By.css('.countDisp')).nativeElement;
    expect(countElement.textContent.trim()).toBe('42');
  });

  it('should display the correct label', () => {
    component.label = 'Test Label';
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(By.css('.text p')).nativeElement;
    expect(labelElement.textContent.trim()).toBe('Test Label');
  });
});
