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
import { PlaceComponent } from './component/place.component';
import { ResourcesService } from './service/resources.service';
import { MapService } from './service/map.service';
import { KeysPipe } from './pipe/keys.pipe';
import { NamespaceResolverPipe } from './pipe/namespace-resolver.pipe';

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
    PlaceComponent,
    ObjectComponent,
    ObjectDetailComponent,
    KeysPipe,
    NamespaceResolverPipe
  ],
  providers: [MapService, ResourcesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
