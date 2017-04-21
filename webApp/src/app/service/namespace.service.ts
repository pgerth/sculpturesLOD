import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

/*
 * Provides the global variable namespace
 * for all the used namespaces
 * Usage:
 *   this.namespaceService.namespace.['namespace']
 * Example:
 *   this.namespaceService.namespace.['namespace']
 *   returns: ['http://purl.org/dc/elements/1.1/']
*/

@Injectable()
export class NamespaceService {
    public namespace: Object;

    constructor() {
        this.namespace = {
          dc:"http://purl.org/dc/elements/1.1/",
          dcterms:"http://purl.org/dcterms/",
          aat:"http://vocab.getty.edu/aat/",
        };
    }
}
