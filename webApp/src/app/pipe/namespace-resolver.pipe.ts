import { Pipe, PipeTransform } from '@angular/core';
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
  private namespace = {
   dc:"http://purl.org/dc/elements/1.1/",
   dcterms:"http://purl.org/dcterms/",
   aat:"http://vocab.getty.edu/aat/",
  };
  transform(value:any, args:string[]) : any {
    let split = value.split(":", 2)
    let url = this.namespace[split[0]] + split[1]
    return url;
  }
}
