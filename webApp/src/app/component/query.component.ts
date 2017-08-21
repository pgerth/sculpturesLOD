import { Component, OnInit } from '@angular/core';

import { ResourcesService } from '../service/resources.service';
import { MapService } from '../service/map.service';
import { NamespaceService } from '../service/namespace.service';

@Component({
  selector: 'query',
  templateUrl: './query.component.html',
})
export class QueryComponent {
  // public definitions for ressources and map
  public places: Object[];
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
      layers: [this.mapService.baseMaps.OpenStreetMap],
    });
    // adds map control: scale, layertree
    L.control.layers(this.mapService.baseMaps).addTo(this.map);
    L.control.scale().addTo(this.map);

    // major function, which calls the ressourcesService for places datasets
    this.resourcesService
      .getPlaces()
      .subscribe((places: any) => {
        this.places = places;
        for (let place of places) {
          this.genrateMarkerForPlace(place);
        }
      });
  }
  // private function to generate markers and bind popup informations for the results
  private genrateMarkerForPlace (doc : any) {
    let icon = this.mapService.objectIcon
    // icon definition: usage of in mapService defined icon
    // if (doc._index == "object") {icon = this.mapService.objectIcon}
    // if (doc._index == "place") {icon = this.mapService.placeIcon}
    L.marker([doc._source.location.lat, doc._source.location.lon], {icon: icon})
      .addTo(this.map)
      .bindPopup(
        // popUp content creation for each dataset
        "<b>" + doc._source['dcterms:title'] + "</b><br>" +
        doc._source['dcterms:description'] + "<br>" +
        "<a class='url-break' href=" + doc._source['@id'] + ">" + doc._source['@id'] + "</a>");
  }
}
