/// <reference path="../../../node_modules/@types/leaflet/index.d.ts"/>

import { Component, OnInit } from '@angular/core';
import { MapService } from '../service/map.service';
import { ResourcesService } from '../service/resources.service';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styles: [
    './map.component.css',
    '../../node_modules/leaflet/dist/leaflet.css',
    '../../node_modules/leaflet.awesome-markers/dist/leaflet.awesome-markers.css'
  ],
})
export class MapComponent {
  public stats: Object[];
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
  }

  search(term: string) {
    this.resourcesService
      .getDocs(term)
      .subscribe((docs: Object[]) => {
        this.stats = docs['aggregations'];
        this.map.eachLayer(function(layer){
          if (layer._url == undefined) {layer.remove();}
        });
        for (let doc of docs['hits']['hits']) {
          this.genrateMarker(doc);
        }
      });
  }

  private genrateMarker (doc : any) {
    let icon
    if (doc._index == "object") {icon = this.mapService.objectIcon}
    if (doc._index == "place") {icon = this.mapService.placeIcon}
    let marker = L.marker([doc._source.location.lat, doc._source.location.lon], {icon: icon})
      .addTo(this.map)
      .bindPopup(
        "<b>" + doc._source['dcterms:title'] + "</b><br>" +
        doc._source['dcterms:description'] + "<br>" +
        "<a href=" + doc._source['@id'] + ">" + doc._source['@id'] + "</a>"
      );
  }
}
