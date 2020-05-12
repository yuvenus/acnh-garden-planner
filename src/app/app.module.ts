import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GardenComponent } from './garden/garden.component';
import { GardenCellComponent } from './garden/garden-cell/garden-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    GardenComponent,
    GardenCellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
