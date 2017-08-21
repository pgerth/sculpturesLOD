import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Map} from "leaflet";

/*
 * Provides the global variables needed for mapping,
 * e.g. background maps, icon declarations,
 * Usage:
 *   this.mapService.[variable]
 * Example:
 *   this.mapService.baseMaps.RomanEmpire
 *   returns: 'L.tileLayer("http://dare.ht.lu.se/t...)'
*/

@Injectable()
export class MapService {
    public map: Map;
    public baseMaps: any;
    public quarryStyle: any;
    public objectIcon: any;
    public placeIcon: any;

    constructor(private http: Http) {
       // Global basemap declarations used as background maps in leaflet.
        this.baseMaps = {
            OpenStreetMap: L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a></a>'
            }),
            RomanEmpire: L.tileLayer("http://dare.ht.lu.se/tiles/imperium/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://dare.ht.lu.se/">Digital Atlas of the Roman Empire</a></a>'
            }),
            CartoDB: L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            })
        };
       // Global icon declarations used for the styling of markers in leaflet.
        this.objectIcon = L.AwesomeMarkers.icon({
          icon: 'glyphicon-eye-open',
          prefix: 'glyphicon',
          markerColor: 'cadetblue'
        });

        this.placeIcon = L.AwesomeMarkers.icon({
          icon: 'cubes',
          prefix: 'fa',
          markerColor: 'orange'
        });
    }
}
