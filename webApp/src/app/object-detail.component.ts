import { Component } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { KeysPipe } from './keys.pipe';
import { ObjectService } from './shared/object.service';

@Component({
  selector: 'object-detail',
  templateUrl: './object-detail.component.html'
})
export class ObjectDetailComponent {
  public object: Object[];


  constructor(
    private objectService: ObjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.objectService.getObject(+params['id']))
      .subscribe((object: Object[]) => this.object = object);
  }
}
