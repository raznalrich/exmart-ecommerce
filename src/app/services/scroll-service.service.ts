import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollServiceService {
  private scrollSubject = new Subject<string>();
  scrollAction$ = this.scrollSubject.asObservable();

  triggerScroll(categoryId: string) {
    this.scrollSubject.next(categoryId);
  }

  constructor() { }
}
