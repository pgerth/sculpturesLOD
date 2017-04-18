import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../service/resources.service';

@Component({
  selector: 'object',
  templateUrl: './object.component.html',
})
export class ObjectComponent {
  public objects: Object[];

  constructor(
    private resourcesService: ResourcesService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.resourcesService
      .getObjects()
      .subscribe((objects: Object[]) => this.objects = objects);
  }
}
