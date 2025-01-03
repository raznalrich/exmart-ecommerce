import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../../global.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-color-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-button.component.html',
  styleUrl: './color-button.component.scss',
})
export class ColorButtonComponent {
  id: any;
  data: any;
  color: any = '';

  @Input() ColorId: any;
  @Output() colorSelected = new EventEmitter<any>();
  paramSubscription: any;
  constructor(
    public api: ApiServiceService,
    private route: ActivatedRoute,
    public global: GlobalService
  ) {}

  ngOnInit() {
    //Fetch color details
    this.api.getColorById(this.ColorId).subscribe({
      next: (colorData) => {
        this.color = colorData;
        console.log("Colordata",colorData);
        this.color = this.color.colorName;
        console.log('color', this.color);
      },
      error: (error) => {
        console.error('Error fetching color:', error);
      },
    });
  }

  onColorSelect() {
    this.colorSelected.emit({
      id: this.ColorId,
      name: this.color
    });
  }
}
