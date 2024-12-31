import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlistTableComponent } from './orderlist-table.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

interface OrderItem {
  quantity: number;
}

interface Order {
  order: string;
  date: string;
  customer: string;
  status: string;
  amount: number;
  items: OrderItem[];
}

describe('OrderlistTableComponent', () => {
  let component: OrderlistTableComponent;
  let fixture: ComponentFixture<OrderlistTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderlistTableComponent, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderlistTableComponent);
    component = fixture.componentInstance;

    component.OrderList = [{
      order: 'ORD001',
      date: '2024-12-25',
      customer: 'John Doe',
      status: 'Pending',
      amount: 500,
      items: [{ quantity: 2 }, { quantity: 3 }]
    }] as Order[];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table headers correctly', async () => {
    // Using await for async rendering
    await fixture.whenStable();
    const headers = fixture.debugElement.queryAll(By.css('th'));
    const headerTexts = headers.map(header => header.nativeElement.textContent.trim());

    expect(headerTexts).toEqual([
      'Order',
      'Date',
      'Customer',
      'Status',
      'Amount',
      'Items',
      'Action'
    ]);
  });

  it('should render order rows correctly', async () => {
    // Wait for asynchronous rendering to complete
    await fixture.whenStable();
    fixture.detectChanges();

    // Query all rows in the table
    const rows = fixture.debugElement.queryAll(By.css('.styled-table tr'));

    // Ensure there is one header row + one data row
    expect(rows.length).toBe(2);

    // Query all cells in the first data row
    const firstRowCells = rows[1].queryAll(By.css('td'));

    // Map the cell content to an array
    const cellValues = firstRowCells.map((cell, index) => {
      // For the Status column (index 3), query the selected value
      if (index === 3) {
        const selectElement = cell.query(By.css('select')).nativeElement;
        return selectElement.value; // Get the currently selected value
      }
      // For other columns, use the text content
      return cell.nativeElement.textContent.trim();
    });

    // Verify the cell values match the expected data
    expect(cellValues).toEqual([
      'ORD001',          // Order
      '2024-12-25',      // Date
      'John Doe',        // Customer
      'Pending',         // Status
      '₹500.00',         // Amount
      '5',               // Items
      ''                 // Action (empty, as it contains buttons)
    ]);
  });


  it('should open modal on "View Details" button click', async () => {
    await fixture.whenStable();
    const button = fixture.debugElement.query(By.css('.btn-primary'));

    button?.nativeElement.click();
    fixture.detectChanges();

    // Modern way to query the DOM in tests
    const modal = fixture.debugElement.query(By.css('#exampleModal'));
    expect(modal).toBeTruthy();
  });

  it('should call updateOrderStatus on dropdown change', async () => {
    await fixture.whenStable();
    spyOn(component, 'updateOrderStatus');

    // First wait for the @for loop to render
    fixture.detectChanges();

    // Get the select element
    const select = fixture.debugElement.query(By.css('.status-dropdown'));
    expect(select).toBeTruthy('Select element should exist');

    // Get the native select element
    const selectElement = select.nativeElement;

    // Change the value
    selectElement.value = selectElement.options[1].value;  // Selecting "Shipped"

    // Dispatch both events needed for ngModel and change detection
    selectElement.dispatchEvent(new Event('change'));
    selectElement.dispatchEvent(new Event('input'));

    // Detect changes to update the view
    fixture.detectChanges();

    // Verify the spy was called with the correct order
    expect(component.updateOrderStatus).toHaveBeenCalledWith(component.OrderList[0]);
});

  it('should calculate total quantity correctly', () => {
    const items: any[] = [{ quantity: 2 }, { quantity: 3 }];
    const total = component.calculateTotalQuantity(items);
    expect(total).toBe(5);
  });

});
