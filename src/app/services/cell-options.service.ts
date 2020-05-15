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
    gridSize: localStorage.getItem('gridSize') ? parseInt(localStorage.getItem('gridSize')) : 10,
    importConfig: {import: false, file: null},
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
