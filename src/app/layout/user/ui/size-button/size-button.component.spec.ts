import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeButtonComponent } from './size-button.component';

describe('SizeButtonComponent', () => {
  let component: SizeButtonComponent;
  let fixture: ComponentFixture<SizeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizeButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
