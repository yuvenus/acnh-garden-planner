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

  showHelpDialog = false;
  showCreditsDialog = false;

  isSidebarOpen = false;

  constructor(private navService: NavService,
              private disableColorPipe: DisableColorPipe) { }

  ngOnInit(): void { }

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

  setIsSidebarOpen() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.navService.setIsSidebarOpen(this.isSidebarOpen);
  }
}
