import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GardenComponent } from './garden/garden.component';
import { GardenCellComponent } from './garden/garden-cell/garden-cell.component';
import { CellOptionsComponent } from './cell-options/cell-options.component';
import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';

import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { KeyFilterModule } from 'primeng/keyfilter';


import { CellOptionsService } from './services/cell-options.service';

import { DisableColorPipe } from './pipes/disable-color.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GardenComponent,
    GardenCellComponent,
    CellOptionsComponent,
    CustomDropdownComponent,
    DisableColorPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    KeyFilterModule
  ],
  providers: [CellOptionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
