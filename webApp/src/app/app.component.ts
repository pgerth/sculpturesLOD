/// <reference path="../../node_modules/@types/leaflet/index.d.ts"/>

import { Component } from '@angular/core';
import { ResourcesService } from './service/resources.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template:'<router-outlet></router-outlet>'
})
export class AppComponent {}
