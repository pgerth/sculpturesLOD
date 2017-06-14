import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { KeysPipe } from '../pipe/keys.pipe';
import { ResourcesService } from '../service/resources.service';
import { MapService } from '../service/map.service';

@Component({
  selector: 'object-detail',
  templateUrl: './object-detail.component.html',
  styles: ['../node_modules/leaflet/dist/leaflet.css'],
})
export class ObjectDetailComponent {
  public object: Object[];
  public quarry: Object[];
  public properties: string[] = [ "dc:title", "dc:identifier", "dc:temporal", "facet_geschlecht", "facet_lebensalter", "facet_erhaltung", "facet_funktion", "dc:bibliographicCitation" ];

  constructor(
    private route: ActivatedRoute,
    private resourcesService: ResourcesService,
    private mapService: MapService,
  ) {}

  ngOnInit(): void {
    // initialize map & mapping parameters
    let map = L.map('map', {
      center: [40,20],
      zoom: 4,
      layers: [this.mapService.baseMaps.RomanEmpire]
    });
    // adds map control: layertree, scale
    let baseMaps = this.mapService.baseMaps;
    L.control.layers(baseMaps).addTo(map);
    L.control.scale().addTo(map);

    // gets object data
    this.route.params
      .switchMap((params: Params) => this.resourcesService.getObject(+params['id']))
      .subscribe(result => {
        this.object = result;
        let lat = result._source.location.lat
        let lon = result._source.location.lon
        // center map view on find location
        map.setView([lat, lon], 5);
        // add point marker for find location
        L.marker([lat, lon]).addTo(map);
        // searches for nearby quarries
        this.resourcesService.getQuarries(lat, lon)
          .subscribe(res => {
              this.quarry = res;
              L.circleMarker([res.hits[0]._source.location.lat, res.hits[0]._source.location.lon], this.mapService.quarryStyle).addTo(map);
              })
      });
  }
}
