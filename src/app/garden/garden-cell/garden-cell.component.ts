import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { contentClass } from '../../classes/content.class';
import { MouseDownService } from '../../services/mouse-down.service';
import { Subscription } from 'rxjs';
import * as enums from '../../../enums';

@Component({
  selector: 'app-garden-cell',
  templateUrl: './garden-cell.component.html',
  styleUrls: ['./garden-cell.component.scss']
})
export class GardenCellComponent implements OnInit, OnDestroy {

  @Input() currentSelection = new contentClass;
  @Input() content = new contentClass;
  @Output() stateChange = new EventEmitter();
  @Output() contentChange = new EventEmitter()

  mouseDownSubscription = new Subscription;
  isMouseDown = false;

  // https://stackblitz.com/edit/angular-mousemove-after-mouse-down?file=app%2Fmouse-events%2Fmouse-events.component.ts
  

  constructor(private mouseDownService: MouseDownService) { }

  ngOnInit(): void {
    this.mouseDownSubscription = this.mouseDownService.getMouseDown()
      .subscribe(down => this.isMouseDown = down);
  }

  ngOnDestroy() {
    this.mouseDownSubscription.unsubscribe();
  }

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
  
  detectMouseDownAndMouseOver() {
    if (this.isMouseDown) {
      this.changeType();
    }
  }
}
