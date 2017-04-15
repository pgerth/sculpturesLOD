import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { KeysPipe } from '../pipe/keys.pipe';
import { ObjectService } from '../service/object.service';
import { MapService } from '../service/map.service';

@Component({
  selector: 'object-detail',
  templateUrl: './object-detail.component.html',
  styles: ['../node_modules/leaflet/dist/leaflet.css'],
})
export class ObjectDetailComponent {
  public object: Object[];
  public properties: string[] = [ "dc:title", "dc:identifier", "dc:medium", "dc:temporal", "facet_geschlecht", "facet_lebensalter", "facet_erhaltung", "facet_funktion", "dc:bibliographicCitation" ];

  constructor(
    private route: ActivatedRoute,
    private objectService: ObjectService,
    private mapService: MapService,
  ) {}

  ngOnInit(): void {
    // initialize map & mapping parameters
    let map = L.map('map', {
      center: [40,20],
      zoom: 4
    });
    L.control.scale().addTo(map);
    L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png").addTo(map);

    //
    this.route.params
      .switchMap((params: Params) => this.objectService.getObject(+params['id']))
      .subscribe(result => {
        this.object = result;
        if (typeof result._source.location.lat != "undefined") { 
          // center map view on find location
          map.setView([result._source.location.lat, result._source.location.lon], 7);
          // add point marker for find location
          L.marker([result._source.location.lat, result._source.location.lon]).addTo(map);
        }
      });
  }
}
