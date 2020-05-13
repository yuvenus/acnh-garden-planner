import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CellOptionsService {
  selectedCellOption = new BehaviorSubject(null);
  selectedColorOption = new BehaviorSubject(null);

  constructor() { }

  getSelectedCellOption() {
    return this.selectedCellOption.asObservable();
  }

  setSelectedCellOption(cellOption) {
    this.selectedCellOption.next(cellOption);
  }

  getSelectedColorOption() {
    return this.selectedColorOption.asObservable();
  }

  setSelectedColorOption(colorOption) {
    this.selectedColorOption.next(colorOption);
  }
}
