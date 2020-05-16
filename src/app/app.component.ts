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

  @HostListener('mouseup', ['$event'])
  onMouseUp(event) {
    this.mouseDownService.setMouseDown(false);
  }

}
