import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'; // add map function to observable

@Injectable()
export class ObjectService {

  constructor(
    private http: Http
  ) { }

  getObjects() {
    return this.http.get('http://localhost:9200/object/arachne/_search?pretty=true&filter_path=hits.hits._source')
      .map((res: Response) => res.json().hits.hits);
  }

  getObject(id: number) {
    const url = `http://localhost:9200/object/arachne/${id}`;
    return this.http.get(url)
      .map((res: Response) => res.json());
  }
}
