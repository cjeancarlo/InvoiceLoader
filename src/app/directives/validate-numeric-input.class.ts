import { Injectable } from '@angular/core';
import { NumericInputsFormat } from '../interfaces/numeric-inputs-format';
import { StatusResponse } from '../interfaces/status-response';

@Injectable()
export class ValidateNumericInput {
  tipoInput: string;
  value: string;
  private tipo: string;
  private cantidad: NumericInputsFormat;
  private monto: NumericInputsFormat;

  constructor() {
    this.monto = { int: 20, dec: 2 };
    this.cantidad = { int: 15, dec: 7 };
  }

  validateNumberLen(): StatusResponse {
    this.tipo = this.tipoInput;
    let tipo: NumericInputsFormat = this[this.tipo];

    if (typeof this[this.tipo] !== 'object') {
      tipo = this.monto;
    }

    const parts = this.value
      .replace(/\./g, '')
      .toString()
      .split(',');
    if (typeof parts[1] === 'undefined') {
      parts[1] = '0';
    }

    if (tipo.int < parts[0].length || tipo.dec < parts[1].length) {
      return {
        status: false,
        error:
          'superó la longitud máxima ' +
          tipo.int +
          ' intreger, ' +
          tipo.dec +
          ' decimales '
      };
    }
    return { status: true, error: null };
  }

  validateEndChar(): StatusResponse {
    const invalidEndchars = [',', '.'];
    // tslint:disable-next-line:forin
    for (const i in invalidEndchars) {
      if (
        this.value.lastIndexOf(invalidEndchars[i]) === this.value.length - 1 &&
        this.value.lastIndexOf(invalidEndchars[i]) !== -1
      ) {
        return { status: false, error: 'miss decimals' };
      }
      return { status: true, error: null };
    }
  }

  validateThousandSeparator() {
    const rgxThousandSeparator = /^\d{1,3}(\.\d{3})*(\,\d+)?$/;
    if (!rgxThousandSeparator.test(this.value)) {
      return { status: false, error: 'invalid separator' };
    }
    return { status: true, error: null };
  }

  validateBiggerThanCero() {
    const nanvalue: number = +this.value.replace(/\./g, '');
    if (nanvalue <= 0) {
      return { status: false, error: 'bigger than cero' };
    }
    return { status: true, error: null };
  }
}
