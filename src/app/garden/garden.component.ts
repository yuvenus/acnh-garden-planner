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
        else if (this.currentSelection.color != cellObj.selectedColorOption) {
          this.currentSelection.color = cellObj.selectedColorOption;
        }
        else if (cellObj.clearGridConfirmation) {
          this.initGrid(this.gridSize);
        }
        else if (this.gridSize != cellObj.gridSize) {
          this.gridSize = cellObj.gridSize;
          this.reprocessGrid(this.gridSize);
        }
        else if (cellObj.importConfig.import) {
          this.importConfig(cellObj.importConfig.file);
        }
        else if (cellObj.exportConfig) {
          this.exportConfig();
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

  private createEmptyRows(size, contents) {
    return new Array(size)
      .fill(0)
      .map(() => cloneDeep(contents))
  }

  importConfig(event) {
    if (event && event.target && event.target.files && event.target.files.length > 0) {
      let finalString = '';
      let tempGrid = [];
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const fileString = fileReader.result.toString();
        finalString = fileString;
      }
      
      fileReader.onloadend = () => {
        tempGrid = finalString.split('\n');
        tempGrid = tempGrid.map(row => {
          let splitRow = row.split(',');
          splitRow = splitRow.map(
            inside => {
              const insideSplit = inside.split('|');
              if (insideSplit.length == 2) {
                return ({content: {cellOption: insideSplit[0], color: insideSplit[1]}})
              }
              return ({content: new contentClass});
            }
          );
          return splitRow;
        });
  
        this.grid = tempGrid;

        console.log(tempGrid);
      }
  
      fileReader.readAsText(file);
    }
  }

  exportConfig() {
    let csvContent = [];
    let csvString = '';
    for (let row of this.grid) {
      let rowList = [];
      for (let cell of row) {
        rowList.push(`${cell.content.cellOption}|${cell.content.color}`);
      }
      csvContent.push(`${rowList.join(',')}`);
    }

    csvString = csvContent.join('\n');

    // thanks stackoverflow https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
    var blob = new Blob([csvString], { type: 'text/plain' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, "my_garden.txt");
    } else {
        const link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "my_garden.txt");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
  }
    
}
