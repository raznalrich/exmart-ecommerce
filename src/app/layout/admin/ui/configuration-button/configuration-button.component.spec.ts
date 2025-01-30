import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationButtonComponent } from './configuration-button.component';

describe('ConfigurationButtonComponent', () => {
  let component: ConfigurationButtonComponent;
  let fixture: ComponentFixture<ConfigurationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
