import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent }   from './map.component';
import { ObjectComponent }   from './object.component';

const routes: Routes = [
  { path: '', redirectTo: '/object', pathMatch: 'full' },
  { path: 'map',  component: MapComponent },
  { path: 'object',  component: ObjectComponent },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}