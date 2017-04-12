import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map.component';
import { ObjectComponent } from './object.component';
import { ObjectDetailComponent } from './object-detail.component';
import { ObjectService } from './shared/object.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    MapComponent,
    ObjectComponent,
    ObjectDetailComponent
  ],
  providers: [ObjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
