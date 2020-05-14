import { Component, OnInit } from '@angular/core';
import { CellOptionsService } from '../services/cell-options.service';
import * as enums from '../../enums';
import * as lists from '../../lists';

@Component({
  selector: 'app-cell-options',
  templateUrl: './cell-options.component.html',
  styleUrls: ['./cell-options.component.scss']
})
export class CellOptionsComponent implements OnInit {

  cellOptions = lists.cellOptions;
  colorOptions = lists.colorOptions;

  contentEnum = enums.cellContents;
  flowerEnum = enums.flowers;
  colorEnum = enums.colors;

  selectedCellOption = this.contentEnum.EMPTY;
  selectedColorOption = this.colorEnum.RED;

  showClearConfirmation = false;
  showChangeGridConfirmation = false;

  newGridSize = 20;

  fileInput = null;

  constructor(private cellOptionsService: CellOptionsService) { }

  ngOnInit(): void {
  }

  setCellOption(event) {
    this.cellOptionsService.setCellOptionsChanges('selectedCellOption', event)
  }

  setColorOption(event) {
    this.cellOptionsService.setCellOptionsChanges('selectedColorOption', event)
  }

  clearGrid() {
    this.cellOptionsService.setCellOptionsChanges('clearGridConfirmation', true);
    this.cellOptionsService.setCellOptionsChanges('clearGridConfirmation', false);
    this.showClearConfirmation = false;
  }

  changeGridSize() {
    this.cellOptionsService.setCellOptionsChanges('gridSize', +this.newGridSize);
    this.showChangeGridConfirmation = false;
  }

  importConfig(event) {
    this.cellOptionsService.setCellOptionsChanges('importConfig', {import: true, file: event});
    this.cellOptionsService.setCellOptionsChanges('importConfig', {import: false, file: null});

    this.fileInput = null;
  }

  exportConfig() {
    this.cellOptionsService.setCellOptionsChanges('exportConfig', true);
    this.cellOptionsService.setCellOptionsChanges('exportConfig', false);
  }
}
