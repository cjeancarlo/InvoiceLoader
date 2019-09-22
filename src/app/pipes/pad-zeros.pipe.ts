import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padZeros'
})
export class PadZerosPipe implements PipeTransform {

  transform(pad: number, ...args: any[]): string {
    return ('00000000'+pad).slice(-8);;

  }

}
