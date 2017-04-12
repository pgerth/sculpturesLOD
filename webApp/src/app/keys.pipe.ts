import { Pipe, PipeTransform } from '@angular/core';
/*
 * Returns the keys of an object, which holds key/value pairs.
 * Takes an object as argument.
 * Usage:
 *   jsonobject | keys
 * Example:
 *   json = { keyA:valueX, keyB:valueY, keyC:valueZ }
 *   {{ json |  exponentialStrength:10}}
 *   returns: [keyA, keyB, keyC]
*/

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    if (!value) {
      return value;
    }

    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
}
