import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePageDropdownComponent } from './single-page-dropdown.component';

describe('SinglePageDropdownComponent', () => {
  let component: SinglePageDropdownComponent;
  let fixture: ComponentFixture<SinglePageDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglePageDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePageDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
