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
        console.log(res.total)
        L.geoJSON(prov['_source']['geometry'],{style:this.polygonStyle}).addTo(this.map)
          // definition of the tooltip content
          .bindTooltip(
            "<b>" + prov['_source']['dcterms:title'] + "</b><br>" +
            "Docs:" + res.total
          );
      });
  }
  // styling for polygon
  private polygonStyle() {
    return {
      // fillColor: getColor(feature.properties.children),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
   }
  // reset basemaps to fix bug after each view is build up
  ngAfterViewInit() {
    this.map.removeLayer(this.mapService.baseMaps.CartoDB);
    this.map.addLayer(this.mapService.baseMaps.CartoDB);
  }
}
