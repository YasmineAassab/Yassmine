import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListeGroupeTacheComponent } from './component/liste-groupe-tache/liste-groupe-tache.component';
import { ListeTacheComponent } from './component/liste-tache/liste-tache.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ListeGroupeTacheComponent,
    ListeTacheComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
