/// <reference path="../../node_modules/@types/leaflet/index.d.ts"/>
/// <reference path="../../node_modules/@types/turf/index.d.ts"/>
/// <reference path="../../node_modules/@types/leaflet.awesome-markers/index.d.ts"/>
import 'leaflet';
import 'leaflet-awesome-markers';
import 'turf';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';

import { AppRoutingModule } from './module/app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './component/map.component';
import { ObjectComponent } from './component/object.component';
import { ObjectDetailComponent } from './component/object-detail.component';
import { PlaceComponent } from './component/place.component';
import { ProvinceComponent } from './component/province.component';
import { RoadComponent } from './component/road.component';

import { ResourcesService } from './service/resources.service';
import { MapService } from './service/map.service';
import { NamespaceService } from './service/namespace.service';

import { KeysPipe } from './pipe/keys.pipe';
import { NamespaceResolverPipe } from './pipe/resolver.pipe';
import { ImageResolverPipe } from './pipe/resolver.pipe';

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
    ProvinceComponent,
    RoadComponent,
    ObjectDetailComponent,
    KeysPipe,
    NamespaceResolverPipe,
    ImageResolverPipe
  ],
  providers: [MapService, ResourcesService, NamespaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
