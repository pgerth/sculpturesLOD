import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ResourcesService } from '../service/resources.service';
import { MapService } from '../service/map.service';
import { NamespaceService } from '../service/namespace.service';

@Component({
  selector: 'query',
  templateUrl: './query.component.html',
})
export class QueryComponent implements AfterViewInit {
  // public definitions for ressources and map
  public provinces: Object[];
  public map: L.Map;

  constructor(
    private resourcesService: ResourcesService,
    private mapService: MapService,
    private namespaceService: NamespaceService,
  ) {}

  ngOnInit(): void {
    // initialize map & mapping parameters
    this.map = L.map('map', {
      center: [43,10],
      zoom: 4,
      layers: [this.mapService.baseMaps.CartoDB],
    });
    // adds map control: scale, layertree
    L.control.layers(this.mapService.baseMaps).addTo(this.map);
    L.control.scale().addTo(this.map);

    // major function, which calls the ressourcesService for places datasets
    this.resourcesService.getProvinces()
      .subscribe((res: any) => {
        this.provinces = res;
        for (let prov of res.hits) {
          this.generatePolygon(prov)
        }
      });
  }
  // private function to generate a shape and create a tooltip
  private generatePolygon(prov : any) {
    prov['_source']['geometry'].type = "MultiPolygon";
    this.resourcesService.getDocsByProvince(prov['_id'])
      .subscribe((res: any) => {
        let style = this.polygonStyle(res.total);
        L.geoJSON(prov['_source']['geometry'],{style: style}).addTo(this.map)
          // definition of the tooltip content
          .bindTooltip(
            "<b>" + prov['_source']['dcterms:title'] + "</b><br>" +
            "Docs:" + res.total
          );
      });
  }
  // styling for polygon
  private polygonStyle(count: number) {
    return {
      fillColor: this.getColor(count),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
   }

  //
  private getColor(count: number) {
    let color = "#feebe2"
    let breaks = {
      "0":"#fcc5c0",
      "5":"#fa9fb5",
      "10":"#f768a1",
      "50":"#dd3497",
      "100":"#ae017e",
      "500":"#7a0177"
    };
    for (let key of Object.keys(breaks)) {
      if (count > Number(key)) {color = breaks[key]}
    }
    return color
  }
  // reset basemaps to fix bug after each view is build up
  ngAfterViewInit() {
    this.map.removeLayer(this.mapService.baseMaps.CartoDB);
    this.map.addLayer(this.mapService.baseMaps.CartoDB);
  }
}
