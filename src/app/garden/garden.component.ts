import { Component, OnInit, OnDestroy } from '@angular/core';
import * as enums from '../../enums';
import { Subscription } from 'rxjs';
import { CellOptionsService } from '../services/cell-options.service';
import { contentClass } from '../classes/content.class';

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
    content: this.currentSelection
  }

  cellOptionSubscription = new Subscription;
  colorOptionSubscription = new Subscription;

  constructor(private cellOptionsService: CellOptionsService) { }

  ngOnInit(): void {
    this.grid = new Array(this.gridSize)
      .fill(this.cellContents)
      .map(() => new Array(this.gridSize).fill(this.cellContents));

    this.cellOptionSubscription = this.cellOptionsService.getSelectedCellOption()
      .subscribe(cellOption => this.currentSelection.cellOption = cellOption);
    this.colorOptionSubscription = this.cellOptionsService.getSelectedColorOption()
      .subscribe(colorOption => this.currentSelection.color = colorOption);
  }

  ngOnDestroy() {
    this.cellOptionSubscription.unsubscribe();
    this.colorOptionSubscription.unsubscribe();
  }


}
