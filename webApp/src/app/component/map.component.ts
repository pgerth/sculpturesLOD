/// <reference path="../../../node_modules/@types/leaflet/index.d.ts"/>

import { Component, OnInit } from '@angular/core';
import 'leaflet';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styles: ['./map.component.css', '../../node_modules/leaflet/dist/leaflet.css'],
})
export class MapComponent {
  ngOnInit(): void {
    let map = new L.Map('map', {
      center: new L.LatLng(40.731253, -73.996139),
      zoom: 12,
    });
  }
}
