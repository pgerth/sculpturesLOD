/// <reference path="../../node_modules/@types/leaflet/index.d.ts"/>
import 'leaflet';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './module/app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './component/map.component';
import { ObjectComponent } from './component/object.component';
import { ObjectDetailComponent } from './component/object-detail.component';
import { ObjectService } from './service/object.service';
import { MapService } from './service/map.service';
import { KeysPipe } from './pipe/keys.pipe';

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
    ObjectDetailComponent,
    KeysPipe
  ],
  providers: [MapService, ObjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
