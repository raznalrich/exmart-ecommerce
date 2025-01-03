import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LongButtonComponent } from "../../../user/ui/long-button/long-button.component";
// import { NgxSimpleTextEditorModule } from './st-editor/st-editor.component';
import { NgxSimpleTextEditorModule  } from 'ngx-simple-text-editor';
import { EditorConfig, ST_BUTTONS ,  } from 'ngx-simple-text-editor';
import { AdminSettingsTextEditorComponent } from './admin-settings-text-editor.component';

describe('AdminSettingsTextEditorComponent', () => {
  let component: AdminSettingsTextEditorComponent;
  let fixture: ComponentFixture<AdminSettingsTextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // declarations: [AdminSettingsTextEditorComponent, LongButtonComponent, NgxSimpleTextEditorModule],
      imports: [FormsModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSettingsTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the policy name in the header', () => {
    const headerText = fixture.debugElement.query(
      By.css('.headers .textEditorName')
    ).nativeElement.textContent;
    expect(headerText).toContain('Policy Name');
  });

  it('should render the logo with the correct image source', () => {
    const logo = fixture.debugElement.query(
      By.css('.headers .exmartLogo img')
    ).nativeElement;
    expect(logo.src).toContain('icons/exMartlogov1.png');
    expect(logo.alt).toBe('exmmartlogo');
  });

  it('should render the Save Changes button', () => {
    const button = fixture.debugElement.query(By.css('.saveButton app-long-button'));
    expect(button).toBeTruthy();
    expect(button.attributes['label']).toBe('Save Changes');
  });

  it('should trigger the subbtn() method on button click', () => {
    spyOn(component, 'subbtn');
    const button = fixture.debugElement.query(
      By.css('.saveButton app-long-button')
    );
    button.triggerEventHandler('click', null);
    expect(component.subbtn).toHaveBeenCalled();
  });

  it('should render the router-outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
  });
});
