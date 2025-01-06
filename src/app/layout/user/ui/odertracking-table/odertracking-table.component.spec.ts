import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdertrackingTableComponent } from './odertracking-table.component';

describe('OdertrackingTableComponent', () => {
  let component: OdertrackingTableComponent;
  let fixture: ComponentFixture<OdertrackingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OdertrackingTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdertrackingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
