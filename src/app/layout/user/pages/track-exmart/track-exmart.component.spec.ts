import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackExmartComponent } from './track-exmart.component';

describe('TrackExmartComponent', () => {
  let component: TrackExmartComponent;
  let fixture: ComponentFixture<TrackExmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackExmartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackExmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
