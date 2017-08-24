import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ResourcesService } from '../service/resources.service';
import { MapService } from '../service/map.service';
import { NamespaceService } from '../service/namespace.service';

@Component({
  selector: 'query',
  templateUrl: './province.component.html',
})
export class RoadComponent implements AfterViewInit {
  // public definitions for ressources and map
  public provinces: Object[];
  public map: L.Map;
  public text = '{\n  "query": {\n    "bool": {\n      "must": {\n        "match": {\n          "dcterms:medium.dcterms:title": "Pentelic marble"\n        }\n      },\n      "filter": {\n        "geo_shape": {\n          "geometry": {\n            "indexed_shape": {\n              "index": "shape",\n              "type": "pleiades",\n              "id": "981522",\n              "path": "geometry"\n            }\n          }\n        }\n      }\n    }\n  }\n}\n'

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
        L.geoJSON(res.geometry).addTo(this.map);
        //this.generateBuffer(res.hits[0]);
    });
  }
  // private function to generate a buffer around the via appia (ba_roads.2237)
  private generateBuffer(geom : any) {
    // create 1 km buffer around road line
    let buffer = turf.buffer(geom, 1, 'kilometres');
    L.geoJSON(buffer).addTo(this.map);
    this.getDocsByBuffer(buffer['geometry']);
  }

  private getDocsByBuffer(geom : any) {
    this.resourcesService.getDocsByShape(geom)
      .subscribe((docs: any) =>{
        console.log(docs);
      });
  }

  // reset basemaps to fix bug after each view is build up
  ngAfterViewInit() {
    this.map.removeLayer(this.mapService.baseMaps.CartoDB);
    this.map.addLayer(this.mapService.baseMaps.CartoDB);
  }
}
