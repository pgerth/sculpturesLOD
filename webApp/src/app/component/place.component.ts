import { Component, OnInit } from '@angular/core';

import { ResourcesService } from '../service/resources.service';
import { MapService } from '../service/map.service';
import { NamespaceService } from '../service/namespace.service';

/*
 * Component, which is used to provide an overview of all the places.
 * Showcases an example for an tabular view of the datasets.
*/

@Component({
  selector: 'place',
  templateUrl: './place.component.html',
})
export class PlaceComponent {
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
  private genrateMarkerForPlace (place : any) {
    // icon definition: usage of in mapService defined icon
    let icon = this.mapService.placeIcon
    L.marker([place._source.location.lat, place._source.location.lon], {icon: icon})
      .addTo(this.map)
      .bindPopup(
        // popUp content creation for each dataset
        "<b>" + place._source['dcterms:title'] + "</b><br>" +
        place._source['dcterms:description'] + "<br>" +
        "<a class='url-break' href=" + place._source['@id'] + ">" + place._source['@id'] + "</a>");
  }
}
