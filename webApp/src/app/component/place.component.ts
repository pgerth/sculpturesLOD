import { Component, OnInit } from '@angular/core';

import { ResourcesService } from '../service/resources.service';
import { MapService } from '../service/map.service';
import { NamespaceService } from '../service/namespace.service';

@Component({
  selector: 'place',
  templateUrl: './place.component.html',
})
export class PlaceComponent {
  public places: Object[];
  public map: L.Map;

  constructor(
    private resourcesService: ResourcesService,
    private mapService: MapService,
    private namespaceService: NamespaceService,
  ) {}

  ngOnInit(): void {
    this.map = L.map('map', {
      center: [40,20],
      zoom: 4
    });
    L.control.scale().addTo(this.map);
    L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png").addTo(this.map);

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
        "<b>" + place._source['dc:title'] + "</b><br>" +
        place._source['dc:description'] + "<br>" +
        "<a href=" + place._source['@id'] + ">OXREP Database</a>"
      );
  }
}
