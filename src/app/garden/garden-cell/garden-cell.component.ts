import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { contentClass } from '../../classes/content.class';

@Component({
  selector: 'app-garden-cell',
  templateUrl: './garden-cell.component.html',
  styleUrls: ['./garden-cell.component.scss']
})
export class GardenCellComponent implements OnInit {

  @Input() currentSelection = new contentClass;
  @Input() content = new contentClass;
  @Output() contentChange = new EventEmitter()

  constructor() { }

  ngOnInit(): void { }

  changeType() {
    if (this.content.cellOption == this.currentSelection.cellOption && 
        this.content.color == this.currentSelection.color) {
      this.content = new contentClass;
    }
    else {
      this.content.cellOption = this.currentSelection.cellOption;
      this.content.color = this.currentSelection.color;

      this.contentChange.emit(this.content);
    }
  } 

}
