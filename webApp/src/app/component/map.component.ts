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
  public places: Object[];
  public objects: Object[];
  public map: L.Map;
  public objectIcon = L.AwesomeMarkers.icon({
    icon: 'glyphicon-asterisk',
    prefix: 'glyphicon',
    markerColor: 'cadetblue'
  });
  public placeIcon = L.AwesomeMarkers.icon({
    icon: 'cubes',
    prefix: 'fa',
    markerColor: 'orange'
  });


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
      });

  }

  search(term: string) {
    this.resourcesService
      .getObjects(term)
      .subscribe((objects: Object[]) => {
        this.objects = objects;
        this.map.eachLayer(function(layer){
          if (layer._url == undefined) {layer.remove();}
        });
        for (let object of objects) {
          this.genrateMarker(object);
          console.log(object)
        }
      });
  }

  private genrateMarker (object : any) {
    let marker = L.marker([object._source.location.lat, object._source.location.lon], {icon: this.mapService.objectIcon})
      .addTo(this.map)
      .bindPopup(
        "<b>" + object._source['dcterms:title'] + "</b><br>" +
        object._source['dcterms:description'] + "<br>" +
        "<a href=" + object._source['@id'] + ">" + object._source['@id'] + "</a>"
      );
  }
}
