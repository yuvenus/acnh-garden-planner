import { Component, OnInit } from '@angular/core';
import { NavService } from '../services/nav.service';
import { DisableColorPipe } from '../pipes/disable-color.pipe'
import * as enums from '../../enums';
import * as lists from '../../lists';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [DisableColorPipe]
})
export class NavComponent implements OnInit {

  cellOptions = lists.cellOptions;
  colorOptions = lists.colorOptions;

  contentEnum = enums.cellContents;
  flowerEnum = enums.flowers;
  colorEnum = enums.colors;

  selectedCellOption = this.contentEnum.EMPTY;
  selectedColorOption = this.colorEnum.RED;

  showClearConfirmation = false;
  showChangeGridConfirmation = false;
  showHelpDialog = false;
  showCreditsDialog = false;

  cellChangesSubscription = new Subscription;

  newGridSize = 0;
  currentGridSize = 0;

  fileInput = null;

  constructor(private navService: NavService,
              private disableColorPipe: DisableColorPipe) { }

  ngOnInit(): void {
    this.cellChangesSubscription = this.navService.getCellOptionsChanges()
      .subscribe(vals => {
        this.currentGridSize = vals.gridSize;
        if (this.newGridSize == 0) {
          this.newGridSize = vals.gridSize;
        }
      });
  }

  setCellOption(event) {
    this.selectedCellOption = event;
    if (this.disableColorPipe.validColors[this.selectedCellOption] && 
        !this.disableColorPipe.validColors[this.selectedCellOption].includes(this.selectedColorOption)) {
      this.selectedColorOption = enums.colors.RED;
      this.setColorOption(this.selectedColorOption);
    }
    this.navService.setCellOptionsChanges('selectedCellOption', event)
  }

  setColorOption(event) {
    this.selectedColorOption = event;
    this.navService.setCellOptionsChanges('selectedColorOption', event)
  }

  clearGrid() {
    this.navService.setCellOptionsChanges('clearGridConfirmation', true);
    this.navService.setCellOptionsChanges('clearGridConfirmation', false);
    this.showClearConfirmation = false;
  }

  changeGridSize() {
    this.navService.setCellOptionsChanges('gridSize', +this.newGridSize);
    this.showChangeGridConfirmation = false;
  }

  importConfig(event) {
    this.navService.setCellOptionsChanges('importConfig', {import: true, file: event});
    this.navService.setCellOptionsChanges('importConfig', {import: false, file: null});

    this.fileInput = null;
  }

  exportConfig() {
    this.navService.setCellOptionsChanges('exportConfig', true);
    this.navService.setCellOptionsChanges('exportConfig', false);
  }
}
