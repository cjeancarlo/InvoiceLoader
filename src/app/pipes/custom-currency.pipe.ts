import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    value = (+value);

    value = value.toLocaleString(
      'de-DE',
      {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      }
    );
    return '$' + value;
  }

}
