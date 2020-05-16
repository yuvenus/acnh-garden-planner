import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { declarations, imports, providers } from '../imports';
import { CreditsComponent } from './credits/credits.component';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [AppComponent, ...declarations, CreditsComponent, HelpComponent],
  imports: imports,
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
