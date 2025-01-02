import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationStateService {

  private animationCompleteSubject = new BehaviorSubject<boolean>(false);
  animationComplete$ = this.animationCompleteSubject.asObservable();

  constructor() { }

  setAnimationComplete() {
    this.animationCompleteSubject.next(true);
  }


}
