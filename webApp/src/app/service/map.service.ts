import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Map} from "leaflet";

@Injectable()
export class MapService {
    public map: Map;
    public baseMaps: any;
    public quarryStyle: any;
    public objectIcon: any;
    public placeIcon: any;

    constructor(private http: Http) {
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

        this.quarryStyle = {
          color: '#663399',
          weight: 4,
          fillColor: 'white',
          fillOpacity: 0.5,
          radius: 8
        }
    }
}
