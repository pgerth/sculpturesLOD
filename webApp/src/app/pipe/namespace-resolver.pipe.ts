import { Pipe, PipeTransform } from '@angular/core';
import { NamespaceService } from '../service/namespace.service';

/*
 * Resolves the full url of an shortened uri.
 * Takes an id with namespace as argument.
 * Usage:
 *   objectid | resolve
 * Example:
 *   objectid = { dc:titel }
 *   {{ objectid |  resolve}}
 *   returns: [http://purl.org/dc/elements/1.1/titel]
*/

@Pipe({name: 'resolve'})
export class NamespaceResolverPipe implements PipeTransform {
  constructor(public namespaceService: NamespaceService) {}

  transform(value:any, args:string[]) : any {
    let split = value.split(":", 2)
    let url = this.namespaceService.namespace[split[0]] + split[1]
    return url;
  }
}
