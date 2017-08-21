import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { KeysPipe } from '../pipe/keys.pipe';
import { ResourcesService } from '../service/resources.service';
import { MapService } from '../service/map.service';

/*
 * Component, which is used to give an detailed overview for every object.
 * Showcases an single dataset view, where every property is linked to their
 * SemanticWeb Representation. Further some basic spatial querries:
 * - 500km radius search for possible quarries, where the same material was produced.
 * - Nearest Neighbor Search for Orbis Nodes to provide a link to the Orbis API
 *   for calculating the travel times between the object and each possible quarry
*/

@Component({
  selector: 'object-detail',
  templateUrl: './object-detail.component.html',
  styles: ['../node_modules/leaflet/dist/leaflet.css'],
})
export class ObjectDetailComponent implements AfterViewInit {
  // definition of public parameters for map, ressources and facetted search parameters
  public object: Object[];
  public quarries: Object[];
  public map: L.Map;
  public orbisId: string;
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
      .switchMap((params: Params) => this.resourcesService.getObjectById(+params['id']))
      .subscribe(result => {
        this.object = result;
        let lat = result._source.location.lat
        let lon = result._source.location.lon
        let medium = result._source['dcterms:medium']
        // center map view on find location
        this.map.setView([lat, lon], 5);
        // add point marker for find location
        this.generateMarker(this.object);
        // searches for closest Orbis point
        this.resourcesService.getOrbisId(this.object['_source'].location.lat, this.object['_source'].location.lon)
          .subscribe(res => {
            this.orbisId = res.hits[0]._id;
          });
        // searches for nearby quarries by position and the material of the find object
        this.resourcesService.getQuarries(lat, lon,medium[medium.length-1]['dcterms:title'])
          .subscribe(res => {
              this.quarries = res;
              // add point marker for each quarry location
              for (let quarry of this.quarries['hits']) {
                this.generateMarker(quarry);
              }
            });
        // draws circle with 500km radius to visualize the spatial query
        L.circle([lat, lon], {radius: 500000}).addTo(this.map);
      });
  }

  // private function to generate markers and bind popup informations for the results
  private generateMarker (doc : any) {
    // default icon definition
    let icon = this.mapService.objectIcon
    // alternative icon definition for places
    if (doc._index == "place") {icon = this.mapService.placeIcon}
    this.resourcesService.getOrbisId(doc._source.location.lat, doc._source.location.lon)
      .subscribe(orbisRes => {
        let marker = L.marker([doc._source.location.lat, doc._source.location.lon], {icon: icon})
          .addTo(this.map)
          .bindPopup(
            // popUp content creation for each dataset
            "<b>" + doc._source['dcterms:title'] + " </b>" +
            "<a href=" + doc._source['@id'] +
            "><i class='fa fa-external-link' aria-hidden='true'></i></a>" + "<br>" +
            doc._source['dcterms:description'] + "<br>" +
            "<a target='_blank' href='http://orbis.stanford.edu/api/route/" + this.orbisId + "/" + orbisRes.hits[0]._id + "/6/1'>Orbis Route Calculation<a>"
          );
      });
    }
    // reset basemaps to fix bug after each view is build up
    ngAfterViewInit() {
      this.map.removeLayer(this.mapService.baseMaps.RomanEmpire);
      this.map.addLayer(this.mapService.baseMaps.RomanEmpire);
    }
  }
