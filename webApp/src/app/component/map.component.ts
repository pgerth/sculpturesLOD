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
  public places: Object[];
  public map: L.Map;

  constructor(
    private resourcesService: ResourcesService,
    private mapService: MapService,
  ) {}

  ngOnInit(): void {
    // initialize map & mapping parameters
    this.map = L.map('map', {
      center: new L.LatLng(40, 15),
      zoomControl: false,
      zoom: 5,
      layers: [this.mapService.baseMaps.RomanEmpire],
    });

    // adds map control: layertree, scale
    let baseMaps = this.mapService.baseMaps;
    L.control.zoom({position: 'topright'}).addTo(this.map);
    L.control.layers(baseMaps).addTo(this.map);
    L.control.scale().addTo(this.map);

    this.resourcesService
      .getPlaces()
      .subscribe((places: any) => {
        this.places = places;
        for (let place of places) {
          this.genrateMarkerForPlace(place);
        }
      });

  }

  private genrateMarkerForPlace (place : any) {
    L.marker([place._source.location.lat, place._source.location.lon])
      .addTo(this.map)
      .bindPopup(
        "<b>" + place._source['dcterms:title'] + "</b><br>" +
        place._source['dcterms:description'] + "<br>" +
        "<a href=" + place._source['@id'] + ">" + place._source['@id'] + "</a>"
      );
  }
}
