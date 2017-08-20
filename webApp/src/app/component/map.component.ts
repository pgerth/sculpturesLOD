/// <reference path="../../../node_modules/@types/leaflet/index.d.ts"/>

import { Component, OnInit } from '@angular/core';
import { MapService } from '../service/map.service';
import { ResourcesService } from '../service/resources.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  // defenition of public parameters for map, ressources and facetted search parameters
  public docs: Object[];
  public map: L.Map;
  public searchTerm: string;
  public selectedIndex = "place,object";
  public selectedType = "";
  public selectedMedium = "";
  public selectedTemporal = "";

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
    L.control.zoom({position: 'topright'}).addTo(this.map);
    L.control.layers(this.mapService.baseMaps).addTo(this.map);
    L.control.scale().addTo(this.map);
  }

  // simple function to reload web page
  refresh(): void {
    location.reload();
  }

  // general search function, which calls the ressources service with provided
  // facetted search parameters
  private search(term: string, index: string, type: string, medium: string, temporal: string) {
    this.searchTerm = term;
    this.selectedIndex = index;
    this.selectedType = type;
    this.selectedMedium = medium;
    this.selectedTemporal = temporal;

    this.resourcesService
      .getDocs(term,index,type,medium,temporal)
      .subscribe((docs: Object[]) => {
        this.docs = docs;
        this.map.eachLayer(function(layer){
          if (layer._url == undefined) {layer.remove();}
        });
        for (let doc of docs['hits']['hits']) {
          this.generateMarker(doc);
        }
      });
  }

  // private function to generate markers and bind popup informations for the results
  private generateMarker (doc : any) {
    let icon
    // icon definition in dependency of the document type
    if (doc._index == "object") {icon = this.mapService.objectIcon}
    if (doc._index == "place") {icon = this.mapService.placeIcon}
    let marker = L.marker([doc._source.location.lat, doc._source.location.lon], {icon: icon})
      .addTo(this.map)
      .bindPopup(
        // popUp content creation for each dataset
        "<b>" + doc._source['dcterms:title'] + "</b><br>" +
        doc._source['dcterms:description'] + "<br>" +
        "<a class='url-break' href=" + doc._source['@id'] + ">" + doc._source['@id'] + "</a>"
      );
  }
}
