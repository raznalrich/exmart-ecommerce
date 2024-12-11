import { Component } from '@angular/core';

@Component({
  selector: 'app-report-page',
  standalone: true,
  imports: [],
  templateUrl: './report-page.component.html',
  styleUrl: './report-page.component.scss',
})
export class ReportPageComponent {
  button: any = {
    id: 1,
    icon: 'bi bi-plus-circle',
    title: 'Create New',
  };
}
