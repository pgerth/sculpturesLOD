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

  constructor(
    private resourcesService: ResourcesService,
    private mapService: MapService,
    private namespaceService: NamespaceService,
  ) {}

  ngOnInit(): void {
    let map = L.map('map', {
      center: [40,20],
      zoom: 4
    });
    L.control.scale().addTo(map);
    L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png").addTo(map);

    this.resourcesService
      .getPlaces()
      .subscribe((places: Object[]) => {
        this.places = places;
        for (let place of places) {
          L.marker([place._source.location.lat, place._source.location.lon])
            .addTo(map)
            .bindPopup(
              "<b>" + place._source['dc:title'] + "</b><br>" +
              place._source['dc:description'] + "<br>" +
              "<a href=" + place._source['@id'] + ">OXREP Database</a>"
            );
        }
      });
  }
}
