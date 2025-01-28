import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHrDetailsComponent } from './edit-hr-details.component';

describe('EditHrDetailsComponent', () => {
  let component: EditHrDetailsComponent;
  let fixture: ComponentFixture<EditHrDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHrDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
