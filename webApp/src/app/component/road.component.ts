import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ResourcesService } from '../service/resources.service';
import { MapService } from '../service/map.service';
import { NamespaceService } from '../service/namespace.service';

@Component({
  selector: 'query',
  templateUrl: './road.component.html',
})
export class RoadComponent implements AfterViewInit {
  // public definitions for ressources and map
  public provinces: Object[];
  public map: L.Map;
  public text = 'let geom = {"type": "MultiLineString", "coordinates": [...]}\nlet buffer = turf.buffer(geom, 1, "kilometres");\nthis.ressourcesService.getDocsByShape(buffer.geometry)'

  constructor(
    private resourcesService: ResourcesService,
    private mapService: MapService,
    private namespaceService: NamespaceService,
  ) {}

  ngOnInit(): void {
    // initialize map & mapping parameters
    this.map = L.map('map', {
      center: [41.5,12.5],
      zoom: 8,
      layers: [this.mapService.baseMaps.CartoDB],
    });
    // adds map control: scale, layertree
    L.control.layers(this.mapService.baseMaps).addTo(this.map);
    L.control.scale().addTo(this.map);

    // major function, which calls the ressourcesService for places datasets
    this.resourcesService.getRoad()
      .subscribe((res: any) => {
        res.geometry.type = "MultiLineString";
        console.log(res.geometry);
        L.geoJSON(res.geometry, {style: {color: 'red'}}).addTo(this.map);
        this.generateBuffer(res.geometry)
    });
  }
  // private function to generate a buffer around the via appia (ba_roads.2237)
  private generateBuffer(geom : any) {
    // create 1 km buffer around road line & put it on the map
    let buffer = turf.buffer(geom, 1, 'kilometres');
    L.geoJSON(buffer).addTo(this.map);
    let geometry = {"type":"Polygon","coordinates":[[[12.5,41.8],[12.5,41.6],[12.4,41.6],[12.4,41.8],[12.5,41.8]]]};
    this.getDocsByBuffer(buffer.geometry)
  }

  private getDocsByBuffer(geom : any) {
    this.resourcesService.getDocsByShape(geom)
      .subscribe((docs: any) =>{
        console.log(docs);
        for (let doc of docs.hits) {
          this.generateMarkerForPlace(doc)
        }
      });
  }

  private generateMarkerForPlace(place : any) {
    // icon definition: usage of in mapService defined icon
    let icon = this.mapService.objectIcon
    L.marker([place._source.location.lat, place._source.location.lon], {icon: icon})
      .addTo(this.map)
      .bindPopup(
        // popUp content creation for each dataset
        "<b>" + place._source['dcterms:title'] + "</b><br>" +
        place._source['dcterms:description'] + "<br>" +
        "<a class='url-break' href=" + place._source['@id'] + ">" + place._source['@id'] + "</a>");
  }

  // reset basemaps to fix bug after each view is build up
  ngAfterViewInit() {
    this.map.removeLayer(this.mapService.baseMaps.CartoDB);
    this.map.addLayer(this.mapService.baseMaps.CartoDB);
  }
}
