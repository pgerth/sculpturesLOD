import { Component } from '@angular/core';
import { ObjectService } from './shared/object.service';

@Component({
  selector: 'object-root',
  template: `
  <a *ngFor="let object of objects" class="col-1-4">
    <h4>{{object['_source']['dc:title']}}</h4>
  </a>
  `
})
export class AppComponent {
  public objects: Object[];

  constructor(private objectService: ObjectService) {
    this.loadData();
  }

  loadData() {
    this.objectService
      .getObject()
      .subscribe((objects: Object[]) => this.objects = objects);
  }

}
