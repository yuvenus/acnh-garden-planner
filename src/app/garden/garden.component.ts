import { Component, OnInit, OnDestroy } from '@angular/core';
import * as enums from '../../enums';
import { Subscription } from 'rxjs';
import { CellOptionsService } from '../services/cell-options.service';
import { contentClass } from '../classes/content.class';
import cloneDeep from 'lodash.clonedeep';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.scss']
})
export class GardenComponent implements OnInit, OnDestroy {

  // enums
  cellContentsEnum = enums.cellContents;

  gridSize = 20;
  grid = [];

  currentSelection = new contentClass;

  cellContents = {
    content: new contentClass
  }

  cellOptionsChangesSubscription = new Subscription;

  constructor(private cellOptionsService: CellOptionsService) { }

  ngOnInit(): void {
    this.initGrid(this.gridSize);

    this.cellOptionsChangesSubscription = this.cellOptionsService.getCellOptionsChanges()
      .subscribe(cellObj => {
        if (this.currentSelection.cellOption != cellObj.selectedCellOption) {
          this.currentSelection.cellOption = cellObj.selectedCellOption;
        }
        if (this.currentSelection.color != cellObj.selectedColorOption) {
          this.currentSelection.color = cellObj.selectedColorOption;
        }
        if (cellObj.clearGridConfirmation) {
          this.initGrid(this.gridSize);
        }
        if (this.gridSize != cellObj.gridSize) {
          this.gridSize = cellObj.gridSize;
          this.reprocessGrid(this.gridSize);
        }
      })
  }

  ngOnDestroy() {
    this.cellOptionsChangesSubscription.unsubscribe();
  }

  initGrid(gridSize) {
    this.grid = new Array(gridSize)
      .fill(0)
      .map(() => this.createEmptyRows(gridSize, this.cellContents));
  }

  reprocessGrid(gridSize) {
    const sizeDifference = this.grid[0].length - gridSize;

    if (sizeDifference < 0) {
      const extraRows = new Array(sizeDifference * -1)
        .fill(0)
        .map(() => this.createEmptyRows(gridSize, this.cellContents));

      this.grid = this.grid
        .map(row => {
          const newArray = this.createEmptyRows((sizeDifference) * -1, this.cellContents) 
          row = row.concat(newArray);
          return row;
        })
        .concat(extraRows);
    }
    else {
      this.grid = this.grid
        .slice(0, gridSize)
        .map(row => row.slice(0, gridSize));
    }
  }

  createEmptyRows(size, contents) {
    return new Array(size)
      .fill(0)
      .map(() => cloneDeep(contents))
  }
}
