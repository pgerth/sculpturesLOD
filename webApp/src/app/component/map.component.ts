/// <reference path="../../../node_modules/@types/leaflet/index.d.ts"/>

import { Component, OnInit } from '@angular/core';
import { MapService } from '../service/map.service';
import { ObjectService } from '../service/object.service';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styles: ['./map.component.css', '../../node_modules/leaflet/dist/leaflet.css'],
})
export class MapComponent {

  constructor(
    private objectService: ObjectService,
    private mapService: MapService,
  ) {}

  ngOnInit(): void {
    let map = new L.Map('map', {
      center: new L.LatLng(40, 20),
      zoom: 4,
      layers: [this.mapService.baseMaps.OpenStreetMap],
    });

  }
}
