import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import * as enums from '../../enums';
import { Subscription } from 'rxjs';
import { NavService } from '../services/nav.service';
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

  gridSize = localStorage.getItem('gridSize') ? parseInt(localStorage.getItem('gridSize')) : 10;
  grid = localStorage.getItem('gardenGrid') ? JSON.parse(localStorage.getItem('gardenGrid')) : [];

  pastStates = [];
  futureStates = [];

  currentSelection = new contentClass;

  cellContents = {
    content: new contentClass
  }

  cellOptionsChangesSubscription = new Subscription;

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    localStorage.setItem('gardenGrid', JSON.stringify(this.grid));
    localStorage.setItem('gridSize', this.gridSize.toString());
  }

  // https://stackoverflow.com/questions/49920652/detect-ctrl-c-and-ctrl-v-in-an-input-from-browsers
  @HostListener('window:keydown',['$event']) onKeyPress($event: KeyboardEvent) {
        if(($event.ctrlKey || $event.metaKey) && $event.keyCode == 90) {
            this.undo();
        }
        if(($event.ctrlKey || $event.metaKey) && $event.keyCode == 89) {
            this.redo();
        }
  }

  constructor(private navService: NavService) { }

  ngOnInit(): void {
    if (this.grid.length === 0) {
      this.initGrid(this.gridSize);
    }

    this.cellOptionsChangesSubscription = this.navService.getCellOptionsChanges()
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
          localStorage.setItem('gridSize', this.gridSize.toString());
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

    localStorage.setItem('gardenGrid', JSON.stringify(this.grid));
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

    localStorage.setItem('gardenGrid', JSON.stringify(this.grid));
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

  updateHistory() {
    if (this.pastStates.length >= 20) {
      this.pastStates.shift();
    }
    this.pastStates.push(JSON.stringify(this.grid));
    this.futureStates = [];
  }

  undo() {
    if (this.pastStates.length > 0) {
      this.futureStates.push(JSON.stringify(this.grid));
      this.grid = JSON.parse(this.pastStates.pop());
    }
  }

  redo() {
    if (this.futureStates.length > 0) {
      this.pastStates.push(JSON.stringify(this.grid));
      this.grid = JSON.parse(this.futureStates.pop());
    }
  }
}
