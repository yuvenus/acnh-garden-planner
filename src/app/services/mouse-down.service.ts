import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MouseDownService {
  isMouseDown = new BehaviorSubject(false);

  constructor() { }

  getMouseDown() {
    return this.isMouseDown.asObservable();
  }

  setMouseDown(mouseDown) {
    this.isMouseDown.next(mouseDown);
  }
}
