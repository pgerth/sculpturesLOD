import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../service/resources.service';
import { NamespaceService } from '../service/namespace.service';

@Component({
  selector: 'object',
  templateUrl: './object.component.html',
})
export class ObjectComponent {
  public objects: Object[];

  constructor(
    private resourcesService: ResourcesService,
    private namespaceService: NamespaceService
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
