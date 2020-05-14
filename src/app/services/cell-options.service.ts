import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as enums from '../../enums';

@Injectable({
  providedIn: 'root'
})
export class CellOptionsService {
  cellOptionsObj = {
    selectedCellOption: enums.cellContents.EMPTY,
    selectedColorOption: enums.colors.RED,
    clearGridConfirmation: false,
    gridSize: 20,
    importConfig: false,
    exportConfig: false
  }

  cellOptionsChanges = new BehaviorSubject(this.cellOptionsObj);

  constructor() { }

  getCellOptionsChanges () {
    return this.cellOptionsChanges.asObservable();
  }

  setCellOptionsChanges(type, value) {
    this.cellOptionsObj[type] = value;
    this.cellOptionsChanges.next(this.cellOptionsObj);
  }
}
