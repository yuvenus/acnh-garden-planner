import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { declarations, imports, providers } from '../imports';

@NgModule({
  declarations: [AppComponent, ...declarations],
  imports: imports,
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
