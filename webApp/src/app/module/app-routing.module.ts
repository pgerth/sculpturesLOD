import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent }   from '../component/map.component';
import { ObjectComponent }   from '../component/object.component';
import { ObjectDetailComponent }  from '../component/object-detail.component';
import { PlaceComponent }   from '../component/place.component';

const routes: Routes = [
  { path: '', redirectTo: '/object', pathMatch: 'full' },
  { path: 'map',  component: MapComponent },
  { path: 'object',  component: ObjectComponent },
  { path: 'object/:id', component: ObjectDetailComponent },
  { path: 'place',  component: PlaceComponent },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}