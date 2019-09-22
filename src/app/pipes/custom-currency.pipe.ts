import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
      
    value = (+value)
    
    value = value.toLocaleString(
    'de-DE', // leave undefined to use the browser's locale,
                 // or use a string like 'en-US' to override it.
      { maximumFractionDigits:2,
        minimumFractionDigits:2 }
    );
    return '$' +value
  }

}
