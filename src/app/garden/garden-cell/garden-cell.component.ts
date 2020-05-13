import { Component, OnInit, Input } from '@angular/core';
import { cellContents } from '../../../enums';
import { contentClass } from '../../classes/content.class';

@Component({
  selector: 'app-garden-cell',
  templateUrl: './garden-cell.component.html',
  styleUrls: ['./garden-cell.component.scss']
})
export class GardenCellComponent implements OnInit {

  content = new contentClass;
  @Input() currentSelection = new contentClass;

  constructor() { }

  ngOnInit(): void { }

  changeType() {
    if (this.content.equals(this.currentSelection)) {
      this.content = this.content.reset();
    }
    else {
      this.content = this.currentSelection;
    }
  } 

}
