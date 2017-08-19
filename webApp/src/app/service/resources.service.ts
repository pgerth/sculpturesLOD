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
  getDocs(term: string, type: string) {
    const url = `http://localhost:9200/${type}/_search?size=10&source={"query":{"bool":{"must":[{"exists":{"field":"location"}},{"match":{"_all":"${term}"}}]}},"aggs":{"type":{"terms":{"field":"_index"}}}  }`;
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

  // http://localhost:9200/place/_search?source={"query":{"bool":{"must":{"match_all":{}},"filter":{"geo_distance":{"distance":"500km","location":{"lon":15,"lat":43}}}}}}

  getQuarries(lat: number, lon: number) {
    const url = 'http://localhost:9200/place/_search?source={"query":{"bool":{"must":{"match_all":{}},"filter":{"geo_distance":{"distance":"500km","location":{"lon":' + lon + ', "lat":' + lat + '}}}}}}'
    console.log(url)
    return this.http.get(url)
      .map((res: Response) => res.json().hits);
  }

}
