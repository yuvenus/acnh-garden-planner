import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavService } from '../services/nav.service';
import { DisableColorPipe } from '../pipes/disable-color.pipe'
import * as enums from '../../enums';
import * as lists from '../../lists';
import { Subscription } from 'rxjs';
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  providers: [DisableColorPipe],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('250ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit, OnDestroy {

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
  sidebarSubscription = new Subscription;

  newGridSize = 0;
  currentGridSize = 0;

  fileInput = null;
  isSidebarOpen = false;

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

      this.sidebarSubscription = this.navService.getIsSidebarOpen()
        .subscribe(open => this.isSidebarOpen = open);
  }

  ngOnDestroy() {
    this.cellChangesSubscription.unsubscribe();
    this.sidebarSubscription.unsubscribe();
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
