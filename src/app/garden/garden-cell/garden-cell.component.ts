import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { contentClass } from '../../classes/content.class';
import * as enums from '../../../enums';

@Component({
  selector: 'app-garden-cell',
  templateUrl: './garden-cell.component.html',
  styleUrls: ['./garden-cell.component.scss']
})
export class GardenCellComponent implements OnInit {

  @Input() currentSelection = new contentClass;
  @Input() content = new contentClass;
  @Output() stateChange = new EventEmitter();
  @Output() contentChange = new EventEmitter()

  constructor() { }

  ngOnInit(): void { }

  changeType() {
    if (this.content.cellOption == this.currentSelection.cellOption && 
        this.content.color == this.currentSelection.color && this.content.cellOption != enums.cellContents.EMPTY) {
      this.stateChange.emit('changed');
      this.content = new contentClass;
      this.contentChange.emit(this.content);
    }
    else if (this.content.cellOption != this.currentSelection.cellOption || 
            this.content.color != this.currentSelection.color) {
      this.stateChange.emit('changed');
      this.content.cellOption = this.currentSelection.cellOption;
      this.content.color = this.currentSelection.color;
      this.contentChange.emit(this.content);
    }
  } 

}
