import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as enums from '../../enums';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent implements OnInit {

  cellContentsEnum = enums.cellContents;
  
  @Input() options;
  @Input() selectedValue;
  @Input() disabled = false;
  @Output() selectedValueChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitNewValue(event) {
    this.selectedValueChange.emit(event.value);
  }

}
