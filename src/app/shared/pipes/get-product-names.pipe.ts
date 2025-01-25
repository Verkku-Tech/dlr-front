import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getProductNames'
})
export class GetProductNamesPipe implements PipeTransform {

  transform(value: { name: string }[], ): string {
    return value.map(e => e.name).join(', ');
  }

}
