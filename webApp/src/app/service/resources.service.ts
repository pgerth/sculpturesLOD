import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'; // add map function to observable
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ResourcesService {

  constructor(
    private http: Http,
  ) { }

  // function, that returns all documents of all indeces of the data store, found by a full text search term
  getDocs(term: string, index: string, type: string, medium: string, temporal: string) {
    let separator = ``
    if (term == '*') {term=``} else {term=`,{"match":{"_all":"${term}"}}`}
    if (type == '') {type=``} else {type = `/${type}`}
    if (medium !== '' && temporal !== '' ) {separator = `,`}
    if (medium == '') {medium=``} else {medium = `{"term":{"dcterms:medium.dcterms:title":"${medium}"}}`}
    if (temporal == '') {temporal=``} else {temporal = `{"term":{"dcterms:temporal":"${temporal}"}}`}
    const url = `http://localhost:9200/${index}` + type + `/_search?size=500&source={"_source":["location","@id","dcterms:title","dcterms:description"],"query":{"bool":{"must":[{"exists":{"field":"location"}}` + term + `],"filter":{"bool":{"must":[` + medium + separator + temporal + `]}}}},"aggs":{"index":{"terms":{"field":"_index"}},"type":{"terms":{"field":"_type"}},"medium":{"terms":{"field":"dcterms:medium.dcterms:title"}},"temporal":{"terms":{"field":"dcterms:temporal"}}}}`;
    console.log(url)
    return this.http
      .get(url)
      .map((res: Response) => res.json());
  }

  // function, that returns all objects of the data store found by a full text search term
  getObjects(term: string) {
    const url = `http://localhost:9200/object/arachne/_search?source={"query":{"bool":{"must":[{"exists":{"field":"location"}},{"match":{"_all":"${term}"}}]}}}`;
    return this.http
      .get(url)
      .map((res: Response) => res.json().hits.hits);
  }

  // function, that returns
  getObject(id: number) {
    const url = `http://localhost:9200/object/arachne/${id}`;
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  // function that returns all places of the data store
  getPlaces() {
    return this.http.get('http://localhost:9200/place/quarry/_search?pretty=true&size=100&filter_path=hits.hits._source')
      .map((res: Response) => res.json().hits.hits);
  }

  /*
   * Searches for Quarries, that match the material of the given object
   * and is located within 500km distance.
   * Takes the location and the material as arguments. Querries ElasticSearch, e.g.:
   * {"query":{"bool":{"must":{"match_all":{}},"filter":{"geo_distance":{"distance":"500km","location":{"lon":5.59468, "lat":49.64387}}}}}}
   * Returns the matching quarries as object.
   * Usage:
   *   getQuarries(lat, lon, material)
   * Example:
   *   getQuarries(5.59468,49.64387,"limestone")
   *   returns: '[object]'
  */
  getQuarries(lat: number, lon: number, material: string) {
    const url = 'http://localhost:9200/place/_search?source={"query":{"bool":{"must":{"term":{"dcterms:medium.dcterms:title":"' + material + '"}},"filter":{"geo_distance":{"distance":"500km","location":{"lon":' + lon + ', "lat":' + lat + '}}}}}}'
    return this.http.get(url)
      .map((res: Response) => res.json().hits);
  }
  /*
   * Searches for closest Orbis place by a given distance.
   * ElasticSearch example query:
   * {"size":1,"_source":[""],"query":{"match_all":{}},"sort":[{"_geo_distance":{"location":{"lon":23.650904,"lat":37.943263},"order":"asc","unit":"km","distance_type":"plane"}}]}
   * Returns the closest orbis place as object.
   * Usage:
   *   getOrbisId(lat, lon)
   * Example:
   *   getOrbisId(37.943263,23.650904)
   *   returns: '[object]'
  */
  getOrbisId(lat: number, lon: number) {
  const url = 'http://localhost:9200/shape/_search?source={"size":1,"_source":[""],"query":{"match_all":{}},"sort":[{"_geo_distance":{"location":{"lon":'+lon+',"lat":'+lat+'},"order":"asc","unit":"km","distance_type":"plane"}}]}'
  return this.http.get(url)
    .map((res: Response) => res.json().hits);
  }

}
