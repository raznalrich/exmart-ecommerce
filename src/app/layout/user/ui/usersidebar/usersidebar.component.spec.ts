import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersidebarComponent } from './usersidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

describe('UsersidebarComponent', () => {
  let component: UsersidebarComponent;
  let fixture: ComponentFixture<UsersidebarComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, LogoutButtonComponent, UsersidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo', () => {
    const logo = compiled.querySelector('.logo-container img');
    expect(logo).toBeTruthy();
    expect(logo?.getAttribute('src')).toBe('images/exMart-logo.png');
  });

  it('should render the menu items', () => {
    const menuItems = compiled.querySelectorAll('.sidenav-nav-item');
    expect(menuItems.length).toBe(component.menuItems.length);

    // Defining the type for menuItems in the forEach loop
    component.menuItems.forEach((item: { routerLink: string; image: string; item: string }, index: number) => {
      const menuItem = menuItems[index];
      const link = menuItem.querySelector('a');
      const icon = menuItem.querySelector('i');
      const text = menuItem.querySelector('span');

      expect(link?.getAttribute('routerLink')).toBe(item.routerLink);
      expect(icon?.classList.contains(item.image)).toBeTrue();
      expect(text?.textContent?.trim()).toBe(item.item);
    });
  });

  it('should render the logout button', () => {
    const logoutButton = compiled.querySelector('.logout app-logout-button');
    expect(logoutButton).toBeTruthy();
  });

  it('should have a working back button', () => {
    const backButton = compiled.querySelector('.logo-container app-logout-button');
    expect(backButton).toBeTruthy();
  });
});
