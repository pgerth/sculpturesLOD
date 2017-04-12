import { Component } from '@angular/core';
import { ObjectService } from './shared/object.service';

@Component({
  selector: 'app-root',
  template:'<router-outlet></router-outlet>'
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
