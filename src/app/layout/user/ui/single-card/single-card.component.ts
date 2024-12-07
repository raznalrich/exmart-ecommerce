import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-single-card',
  standalone: true,
  imports: [],
  templateUrl: './single-card.component.html',
  styleUrl: './single-card.component.scss'
})
export class SingleCardComponent {

@Input()card:any={
id:0,
imageSrc:'',
altText:''
}

// @Input() card: { id: number; imageSrc: string } = { id: 0, imageSrc: '' };
@Output() cardClicked = new EventEmitter<number>();

onCardClick() {
  this.cardClicked.emit(this.card.id);
}
}
