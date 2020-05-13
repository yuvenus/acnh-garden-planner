import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

}
