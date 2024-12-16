import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSettingsTextEditorComponent } from './admin-settings-text-editor.component';

describe('AdminSettingsTextEditorComponent', () => {
  let component: AdminSettingsTextEditorComponent;
  let fixture: ComponentFixture<AdminSettingsTextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSettingsTextEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSettingsTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
