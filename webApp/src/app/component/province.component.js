"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var resources_service_1 = require("../service/resources.service");
var map_service_1 = require("../service/map.service");
var namespace_service_1 = require("../service/namespace.service");
var ProvinceComponent = (function () {
    function ProvinceComponent(resourcesService, mapService, namespaceService) {
        this.resourcesService = resourcesService;
        this.mapService = mapService;
        this.namespaceService = namespaceService;
        this.text = '{\n  "query": {\n    "bool": {\n      "must": {\n        "match": {\n          "dcterms:medium.dcterms:title": "Pentelic marble"\n        }\n      },\n      "filter": {\n        "geo_shape": {\n          "geometry": {\n            "indexed_shape": {\n              "index": "shape",\n              "type": "pleiades",\n              "id": "981535",\n              "path": "geometry"\n            }\n          }\n        }\n      }\n    }\n  }\n}\n';
        this.code = JSON.stringify(this.text);
    }
    ProvinceComponent.prototype.ngOnInit = function () {
        var _this = this;
        // initialize map & mapping parameters
        this.map = L.map('map', {
            center: [43, 10],
            zoom: 4,
            layers: [this.mapService.baseMaps.CartoDB],
        });
        // adds map control: scale, layertree
        L.control.layers(this.mapService.baseMaps).addTo(this.map);
        L.control.scale().addTo(this.map);
        // major function, which calls the ressourcesService for places datasets
        this.resourcesService.getProvinces()
            .subscribe(function (res) {
            _this.provinces = res;
            for (var _i = 0, _a = res.hits; _i < _a.length; _i++) {
                var prov = _a[_i];
                _this.generatePolygon(prov);
            }
        });
    };
    // private function to generate a shape and create a tooltip
    ProvinceComponent.prototype.generatePolygon = function (prov) {
        var _this = this;
        prov['_source']['geometry'].type = "MultiPolygon";
        this.resourcesService.getDocsByProvince(prov['_id'])
            .subscribe(function (res) {
            var style = _this.polygonStyle(res.total);
            L.geoJSON(prov['_source']['geometry'], { style: style }).addTo(_this.map)
                .bindTooltip("<b>" + prov['_source']['dcterms:title'] + "</b><br>" +
                "Docs:" + res.total);
        });
    };
    // styling for polygon
    ProvinceComponent.prototype.polygonStyle = function (count) {
        return {
            fillColor: this.getColor(count),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    };
    //
    ProvinceComponent.prototype.getColor = function (count) {
        var color = "#feebe2";
        var breaks = {
            "0": "#fcc5c0",
            "2": "#fa9fb5",
            "5": "#f768a1",
            "10": "#dd3497",
            "50": "#ae017e",
            "100": "#7a0177"
        };
        for (var _i = 0, _a = Object.keys(breaks); _i < _a.length; _i++) {
            var key = _a[_i];
            if (count > Number(key)) {
                color = breaks[key];
            }
        }
        return color;
    };
    // reset basemaps to fix bug after each view is build up
    ProvinceComponent.prototype.ngAfterViewInit = function () {
        this.map.removeLayer(this.mapService.baseMaps.CartoDB);
        this.map.addLayer(this.mapService.baseMaps.CartoDB);
    };
    return ProvinceComponent;
}());
ProvinceComponent = __decorate([
    core_1.Component({
        selector: 'query',
        templateUrl: './province.component.html',
    }),
    __metadata("design:paramtypes", [resources_service_1.ResourcesService,
        map_service_1.MapService,
        namespace_service_1.NamespaceService])
], ProvinceComponent);
exports.ProvinceComponent = ProvinceComponent;
//# sourceMappingURL=province.component.js.map