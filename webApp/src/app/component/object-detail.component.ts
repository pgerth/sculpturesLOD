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
  // defenition of public parameters for map, ressources and facetted search parameters
  public object: Object[];
  public quarry: Object[];
  public map: L.Map;
  public properties: string[] = [ "dcterms:title", "dcterms:identifier", "dcterms:temporal", "dcterms:bibliographicCitation" ];

  constructor(
    private route: ActivatedRoute,
    private resourcesService: ResourcesService,
    private mapService: MapService,
  ) {}

  ngOnInit(): void {
    // initialize map & mapping parameters
    this.map = L.map('map', {
      center: [40,20],
      zoom: 4,
      layers: [this.mapService.baseMaps.RomanEmpire]
    });
    // adds map control: layertree, scale
    L.control.layers(this.mapService.baseMaps).addTo(this.map);
    L.control.scale().addTo(this.map);

    // gets object data
    this.route.params
      .switchMap((params: Params) => this.resourcesService.getObject(+params['id']))
      .subscribe(result => {
        this.object = result;
        let lat = result._source.location.lat
        let lon = result._source.location.lon
        // center map view on find location
        this.map.setView([lat, lon], 5);
        // add point marker for find location
        this.generateMarker(this.object);

        // searches for nearby quarries
        this.resourcesService.getQuarries(lat, lon)
          .subscribe(res => {
              this.quarry = res;
              // add point marker for quarry location
              this.generateMarker(this.quarry.hits[0]);
              })
      });
  }

  // private function to generate markers and bind popup informations for the results
  private generateMarker (doc : any) {
    let icon
    // icon definition in dependency of the document type
    if (doc._index == "object") {icon = this.mapService.objectIcon}
    if (doc._index == "place") {icon = this.mapService.placeIcon}
    let marker = L.marker([doc._source.location.lat, doc._source.location.lon], {icon: icon})
      .addTo(this.map)
      .bindPopup(
        // popUp content creation for each dataset
        "<b>" + doc._source['dcterms:title'] + "</b><br>" +
        doc._source['dcterms:description'] + "<br>" +
        "<a class='url-break' href=" + doc._source['@id'] + ">" + doc._source['@id'] + "</a>"
      );
  }

}
