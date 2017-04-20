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

  // function, that returns all objects of the data store
  getObjects() {
    return this.http.get('http://localhost:9200/object/arachne/_search?pretty=true&filter_path=hits.hits._source')
      .map((res: Response) => res.json().hits.hits);
  }

  getObject(id: number) {
    const url = `http://localhost:9200/object/arachne/${id}`;
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
  // function that returns all places of the data store
  getPlaces() {
    return this.http.get('http://localhost:9200/place/_search?pretty=true&filter_path=hits.hits._source')
      .map((res: Response) => res.json().hits.hits);
  }

  // http://localhost:9200/place/_search?source={%22query%22:%20{%22bool%22%20:%20{%22must%22%20:%20{%22match_all%22%20:%20{}},%22filter%22%20:%20{%22geo_distance%22%20:%20{%22distance%22%20:%20%22500km%22,%22location%22%20:%20{%22lon%22%20:%2015,%22lat%22%20:%2043}}}}}}
  // http://localhost:9200/place/_search?source={"query": {"bool" : {"must" : {"match_all" : {}},"filter" : {"geo_distance" : {"distance" : "500km","location" : {"lon" : 15,"lat" : 43}}}}}}
  // http://localhost:9200/place/_search?source={"query":{"bool":{"must":{"match_all":{}},"filter":{"geo_distance":{"distance":"500km","location":{"lon":15,"lat":43}}}}}}

  getQuarries(lat: number, lon: number) {
    const url = 'http://localhost:9200/place/_search?source={"query":{"bool":{"must":{"match_all":{}},"filter":{"geo_distance":{"distance":"500km","location":{"lon":' + lon + ', "lat":' + lat + '}}}}}}'
    console.log(url)
    return this.http.get(url)
      .map((res: Response) => res.json().hits);
  }

}