import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Logo and Description', () => {
    it('should display the company logo', () => {
      const logo = fixture.debugElement.query(By.css('img[src="images/exmart_logo.svg"]'));
      expect(logo).toBeTruthy();
      expect(logo.attributes['alt']).toBeDefined();
    });

    it('should display the company description', () => {
      const description = fixture.debugElement.query(By.css('.col p'));
      expect(description.nativeElement.textContent).toContain('exMart is the online merchandise selling platform');
    });
  });

  describe('Products Section', () => {
    it('should display PRODUCTS heading', () => {
      const heading = fixture.debugElement.queryAll(By.css('.col p strong'))[0];
      expect(heading.nativeElement.textContent.trim()).toBe('PRODUCTS');
    });

    it('should list all product categories', () => {
      const productSection = fixture.debugElement.queryAll(By.css('.col'))[1];
      const categories = productSection.queryAll(By.css('li'));

      expect(categories.length).toBe(3);
      expect(categories[0].nativeElement.textContent).toContain('Appliances');
      expect(categories[1].nativeElement.textContent).toContain('Stationary');
      expect(categories[2].nativeElement.textContent).toContain('Garments');
    });
  });

  describe('Your Account Section', () => {
    it('should display YOUR ACCOUNT heading', () => {
      const heading = fixture.debugElement.queryAll(By.css('.col p strong'))[1];
      expect(heading.nativeElement.textContent.trim()).toBe('YOUR ACCOUNT');
    });

    it('should list all account options', () => {
      const accountSection = fixture.debugElement.queryAll(By.css('.col'))[2];
      const options = accountSection.queryAll(By.css('li'));

      expect(options.length).toBe(2);
      expect(options[0].nativeElement.textContent).toContain('Manage address');
      expect(options[1].nativeElement.textContent).toContain('Order History');
    });
  });

  describe('Contact Section', () => {
    let contactColumn: any;

    beforeEach(() => {
      contactColumn = fixture.debugElement.queryAll(By.css('.col'))[3];
    });

    it('should display CONTACT heading', () => {
      const heading = contactColumn.query(By.css('p strong'));
      expect(heading.nativeElement.textContent.trim()).toBe('CONTACT');
    });

    it('should display phone number with icon', () => {
      const phoneElement = contactColumn.query(By.css('li:first-child'));
      const phoneIcon = phoneElement.query(By.css('.bi-telephone-fill'));

      expect(phoneIcon).toBeTruthy();
      expect(phoneElement.nativeElement.textContent).toContain('+91 99999 99999');
    });

    it('should display email with icon', () => {
      const emailElement = contactColumn.queryAll(By.css('li'))[1];
      const emailIcon = emailElement.query(By.css('.bi-envelope-fill'));

      expect(emailIcon).toBeTruthy();
      expect(emailElement.nativeElement.textContent.trim()).toContain('experion.hr.experionglobal.com');
    });

    it('should display address with icon', () => {
      const addressElement = contactColumn.queryAll(By.css('li'))[2];
      const addressIcon = addressElement.query(By.css('.bi-geo-alt-fill'));

      expect(addressIcon).toBeTruthy();
      expect(addressElement.nativeElement.textContent).toContain('Experion Global');
      expect(addressElement.nativeElement.textContent).toContain('Technopark');
    });

    it('should have a chat button with icon', () => {
      const chatButton = contactColumn.query(By.css('.btn-light'));
      const sendIcon = chatButton.query(By.css('.bi-send-fill'));

      expect(chatButton).toBeTruthy();
      expect(chatButton.nativeElement.textContent).toContain('Chat with HR');
      expect(sendIcon).toBeTruthy();
    });
  });

  describe('Footer Bottom Section', () => {
    it('should display policies text', () => {
      const policiesText = fixture.debugElement.query(By.css('.row.text-center p strong'));
      expect(policiesText.nativeElement.textContent).toContain('Terms and conditions');
      expect(policiesText.nativeElement.textContent).toContain('Shipping policy');
      expect(policiesText.nativeElement.textContent).toContain('Payment policy');
    });

    it('should display copyright notice', () => {
      const copyright = fixture.debugElement.queryAll(By.css('.row.text-center p'))[1];
      expect(copyright.nativeElement.textContent).toContain('© 2024 HR department Experion global');
    });

    it('should have a horizontal rule', () => {
      const hr = fixture.debugElement.query(By.css('hr'));
      expect(hr).toBeTruthy();
    });
  });

  describe('Layout Structure', () => {
    it('should have correct number of columns', () => {
      const columns = fixture.debugElement.queryAll(By.css('.col'));
      expect(columns.length).toBe(4);
    });

    it('should have two rows', () => {
      const rows = fixture.debugElement.queryAll(By.css('.row'));
      expect(rows.length).toBe(2);
    });

    it('should have bootstrap classes applied', () => {
      const container = fixture.debugElement.query(By.css('.container1'));
      expect(container).toBeTruthy();

      const button = fixture.debugElement.query(By.css('.btn.btn-light'));
      expect(button).toBeTruthy();
    });
  });
});
