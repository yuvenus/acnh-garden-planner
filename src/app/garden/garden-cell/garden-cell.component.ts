import { Component, OnInit, Input } from '@angular/core';
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
      this.content = new contentClass;
    }
    else {
      this.content.cellOption = this.currentSelection.cellOption;
      this.content.color = this.currentSelection.color;
    }
  } 

}
