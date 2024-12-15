import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteButtonComponent } from './edit-delete-button.component';

describe('EditDeleteButtonComponent', () => {
  let component: EditDeleteButtonComponent;
  let fixture: ComponentFixture<EditDeleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDeleteButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
