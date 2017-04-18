import { Component } from '@angular/core';
import { ResourcesService } from '../service/resources.service';

@Component({
  selector: 'place',
  templateUrl: './place.component.html',
})
export class PlaceComponent {
  public places: Object[];

  constructor(
    private resourcesService: ResourcesService
  ) {
    this.loadData();
  }

  loadData() {
    this.resourcesService
      .getPlaces()
      .subscribe((places: Object[]) => this.places = places);
  }
}
