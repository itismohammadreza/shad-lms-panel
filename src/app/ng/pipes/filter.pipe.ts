import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ngFilter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], term: string, keys?: string): any[] {
    if (!term) {
      return value;
    }
    value = [...value]
    return (value || []).filter((item: any) => {
      if (keys) {
        return keys.split(',').some((key: string) => new RegExp(term, 'gi').test(this.resolveFieldData(item, key)))
      } else {
        return new RegExp(term, 'gi').test(item)
      }
    });
  }

  resolveFieldData(obj: any, field: string | string[], value?: any) {
    if (typeof field == 'string')
      return this.resolveFieldData(obj, field.split('.'), value);
    else if (field.length == 1 && value !== undefined)
      return obj[field[0]] = value;
    else if (field.length == 0)
      return obj;
    else
      return this.resolveFieldData(obj[field[0]], field.slice(1), value);
  }
}
