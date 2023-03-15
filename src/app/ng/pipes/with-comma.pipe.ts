import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'withComma'
})
export class WithCommaPipe implements PipeTransform {
  transform(value: string | number): string {
    if (value == undefined) {
      return ''
    }
    if (typeof value == 'number') {
      value = value.toString()
    }
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
