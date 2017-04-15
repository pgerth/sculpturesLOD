import { Component } from '@angular/core';
import { ObjectService } from '../service/object.service';

@Component({
  selector: 'object',
  templateUrl: './object.component.html',
})
export class ObjectComponent {
  public objects: Object[];

  constructor(
    private objectService: ObjectService
  ) {
    this.loadData();
  }

  loadData() {
    this.objectService
      .getObjects()
      .subscribe((objects: Object[]) => this.objects = objects);
  }
}
