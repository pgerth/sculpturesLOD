/// <reference path="../../../node_modules/@types/leaflet/index.d.ts"/>

import { Component, OnInit } from '@angular/core';
import { MapService } from '../service/map.service';
import { ResourcesService } from '../service/resources.service';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styles: ['./map.component.css', '../../node_modules/leaflet/dist/leaflet.css'],
})
export class MapComponent {

  constructor(
    private resourcesService: ResourcesService,
    private mapService: MapService,
  ) {}

  ngOnInit(): void {
    // initialize map & mapping parameters
    let map = new L.Map('map', {
      center: new L.LatLng(40, 15),
      zoom: 5,
      layers: [this.mapService.baseMaps.RomanEmpire],
    });

    // adds map control: layertree, scale
    let baseMaps = this.mapService.baseMaps;
    L.control.layers(baseMaps).addTo(map);
    L.control.scale().addTo(map);

  }
}
