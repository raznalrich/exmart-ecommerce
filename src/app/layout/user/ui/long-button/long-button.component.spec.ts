import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LongButtonComponent } from './long-button.component';

describe('LongButtonComponent', () => {
  let component: LongButtonComponent;
  let fixture: ComponentFixture<LongButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongButtonComponent]
    }) .compileComponents();

    fixture = TestBed.createComponent(LongButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

it('should create', () => {
  expect(component).toBeTruthy();
});

it('should render button with label', () => {
  const testLabel = 'Test Button';
  component.label = testLabel;
  fixture.detectChanges();

  const buttonElement = fixture.nativeElement.querySelector('button');
  expect(buttonElement.textContent.trim()).toBe(testLabel);
});

it('should apply custom style class', () => {
  const testClass = 'custom-button';
  component.styleClass = testClass;
  fixture.detectChanges();

  const buttonElement = fixture.nativeElement.querySelector('button');
  expect(buttonElement.classList.contains(testClass)).toBeTruthy();
});

it('should disable button when disabled is true', () => {
  component.disabled = true;
  fixture.detectChanges();

  const buttonElement = fixture.nativeElement.querySelector('button');
  expect(buttonElement.disabled).toBeTruthy();
});

it('should render left-positioned image', () => {
  component.imgSrc = 'test.jpg';
  component.imgAlt = 'Test Image';
  component.imgPosition = 'left';
  component.label = 'Test Button';
  fixture.detectChanges();

  const images = fixture.debugElement.queryAll(By.css('img'));
  expect(images.length).toBe(1);

  const image = images[0];
  const button = fixture.debugElement.query(By.css('button'));

  expect(image.attributes['src']).toBe('test.jpg');
  expect(image.attributes['alt']).toBe('Test Image');
  expect(button.children[0].name).toBe('img');
});

it('should render right-positioned image', () => {
  component.imgSrc = 'test.jpg';
  component.imgAlt = 'Test Image';
  component.imgPosition = 'right';
  component.label = 'Test Button';
  fixture.detectChanges();

  const images = fixture.debugElement.queryAll(By.css('img'));
  expect(images.length).toBe(1);

  const image = images[0];
  const button = fixture.debugElement.query(By.css('button'));
  const lastChild = button.children[button.children.length - 1];

  expect(image.attributes['src']).toBe('test.jpg');
  expect(image.attributes['alt']).toBe('Test Image');
  expect(lastChild.name).toBe('img');
});

it('should not render image when imgSrc is not provided', () => {
  component.imgSrc = '';
  component.label = 'Test Button';
  fixture.detectChanges();

  const images = fixture.debugElement.queryAll(By.css('img'));
  expect(images.length).toBe(0);
});

it('should handle type attribute', () => {
  const testType = 'submit';
  component.type = testType;
  fixture.detectChanges();

  const buttonElement = fixture.nativeElement.querySelector('button');
  expect(buttonElement.type).toBe(testType);
});
});
