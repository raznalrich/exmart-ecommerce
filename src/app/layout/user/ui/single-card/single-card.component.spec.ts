import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCardComponent } from './single-card.component';
import { By } from '@angular/platform-browser';

describe('SingleCardComponent', () => {
  let component: SingleCardComponent;
  let fixture: ComponentFixture<SingleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should bind the @Input() data and display image correctly', () => {
    const mockData = { id: 1, imageCollectionUrl: [
      "https://m.media-amazon.com/images/I/51XQKBTbJ7L._SX569_.jpg",
      "https://m.media-amazon.com/images/I/51U6dpsRaFL._SX569_.jpg",
      "https://m.media-amazon.com/images/I/51Nd4BLQelL._SX569_.jpg"
    ], };
    component.data = mockData;
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('.card-img-top'))
      .nativeElement as HTMLImageElement;

    expect(imgElement.src).toBe(mockData.imageCollectionUrl);
  });

  it('should emit cardClicked event with the correct id on click', () => {
    const mockData = { id: 1, imageCollectionUrl: [
      "https://m.media-amazon.com/images/I/51XQKBTbJ7L._SX569_.jpg",
      "https://m.media-amazon.com/images/I/51U6dpsRaFL._SX569_.jpg",
      "https://m.media-amazon.com/images/I/51Nd4BLQelL._SX569_.jpg"
    ], };
    component.data = mockData;

    spyOn(component.cardClicked, 'emit'); // Spy on the output event emitter
    fixture.detectChanges();

    const cardElement = fixture.debugElement.query(By.css('.card'));
    cardElement.triggerEventHandler('click', null);

    expect(component.cardClicked.emit).toHaveBeenCalledWith(mockData.id);
  });
});
