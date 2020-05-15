import { GardenComponent } from './app/garden/garden.component';
import { GardenCellComponent } from './app/garden/garden-cell/garden-cell.component';
import { CellOptionsComponent } from './app/cell-options/cell-options.component';
import { CustomDropdownComponent } from './app/custom-dropdown/custom-dropdown.component';
import { DisableColorPipe } from './app/pipes/disable-color.pipe';

export const declarations = [
    GardenComponent,
    GardenCellComponent,
    CellOptionsComponent,
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

export const imports = [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    KeyFilterModule
]

import { CellOptionsService } from './app/services/cell-options.service';

export const providers = [
    CellOptionsService
]
