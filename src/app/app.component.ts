import { Component, HostListener } from '@angular/core';
import { MouseDownService } from './services/mouse-down.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'acnh-garden-planner';

  constructor(private mouseDownService: MouseDownService) {}

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    this.mouseDownService.setMouseDown(true);
    event.preventDefault();
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event) {
    this.mouseDownService.setMouseDown(false);
  }

}
