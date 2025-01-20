import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchbarComponent } from './user-searchbar.component';

describe('UserSearchbarComponent', () => {
  let component: UserSearchbarComponent;
  let fixture: ComponentFixture<UserSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSearchbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
