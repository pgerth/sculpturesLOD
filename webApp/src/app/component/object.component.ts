import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../service/resources.service';
import { NamespaceService } from '../service/namespace.service';

/*
 * Component, which is used to provide an free text search over all the objects.
 * Showcases an example for an free text search over all attributes.
*/

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
// performs a full text search on the datastore with the given terms
  search(term: string) {
    this.resourcesService
      .getObjects(term)
      .subscribe((objects: Object[]) => this.objects = objects);
  }
}
