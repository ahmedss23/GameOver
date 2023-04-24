import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceString'
})
export class SliceStringPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.slice(0, 30) + "....";
  }

}
