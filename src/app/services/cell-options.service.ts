import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as enums from '../../enums';

@Injectable({
  providedIn: 'root'
})
export class CellOptionsService {
  selectedCellOption = new BehaviorSubject(enums.cellContents.EMPTY);
  selectedColorOption = new BehaviorSubject(enums.colors.RED);
  clearGridConfirmation = new BehaviorSubject(false);
  gridSize = new BehaviorSubject(20);

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

  getClearGridConfirmation() {
    return this.clearGridConfirmation.asObservable();
  }

  setClearGridConfirmation(clearGrid) {
    this.clearGridConfirmation.next(clearGrid);
  }

  getGridSize() {
    return this.gridSize.asObservable();
  }

  setGridSize(size) {
    this.gridSize.next(size);
  }
}
