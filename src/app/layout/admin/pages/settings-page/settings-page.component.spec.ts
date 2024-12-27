import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SettingsPageComponent } from './settings-page.component';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;

  const mockCategories = [
    { categoryName: 'Category 1', iconPath: '/assets/icon1.png' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    component.category = mockCategories;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display category card with correct info', () => {
    const categoryCard = fixture.debugElement.query(By.css('.category-card'));
    const name = categoryCard.query(By.css('.category-name p')).nativeElement.textContent;
    const icon = categoryCard.query(By.css('img')).attributes['src'];

    expect(name).toContain(mockCategories[0].categoryName);
    expect(icon).toBe(mockCategories[0].iconPath);
  });

  it('should have edit and delete buttons', () => {
    const actionButtons = fixture.debugElement.queryAll(By.css('.category-actions button'));
    expect(actionButtons.length).toBe(2);
  });
});
