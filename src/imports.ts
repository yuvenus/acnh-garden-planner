import { GardenComponent } from './app/garden/garden.component';
import { GardenCellComponent } from './app/garden/garden-cell/garden-cell.component';
import { NavComponent } from './app/nav/nav.component';
import { CustomDropdownComponent } from './app/custom-dropdown/custom-dropdown.component';
import { DisableColorPipe } from './app/pipes/disable-color.pipe';

export const declarations = [
    GardenComponent,
    GardenCellComponent,
    NavComponent,
    CustomDropdownComponent,
    DisableColorPipe
]

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TooltipModule } from 'primeng/tooltip';

export const imports = [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    KeyFilterModule,
    TooltipModule
]

import { NavService } from './app/services/nav.service';
import { MouseDownService } from './app/services/mouse-down.service';

export const providers = [
    NavService,
    MouseDownService
]
