import { Directive, Input, ElementRef, HostListener, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { ValidateNumericInput } from './validate-numeric-input.class';
import { StatusResponse } from '../interfaces/status-response';



@Directive({
  selector: '[appCurrencyNumericInput]',
  providers: [
		{provide: NG_VALIDATORS, useExisting: appCurrencyNumericInput, multi: true},
		ValidateNumericInput
	]

})
export class appCurrencyNumericInput   implements Validator {

    @Input() ThousandSeparator = false;
	@Input() appCurrencyNumericInput: boolean;
	@Input() latestInputValue: number | string;
	@Input() typeInputLen: string;
	@Input() validateBiggerThanCero = true;

	private _onChange: () => void;
	lastKeyCode = false;

	constructor(private el: ElementRef,
				private validateNumericInput: ValidateNumericInput   ) { }

	@HostListener('keydown', ['$event']) onKeyDown(event) {
		const e = <KeyboardEvent> event;
		if (this.appCurrencyNumericInput) {

			if ([46, 8, 9, 27, 13, 188 ].indexOf(e.keyCode) !== -1 ||
			// Allow: Ctrl+A
			(e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
			// Allow: Ctrl+C
			(e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
			// Allow: Ctrl+V
			(e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
			// Allow: Ctrl+X
			(e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
			// Allow: home, end, left, right
			(e.keyCode >= 35 && e.keyCode <= 39)) {
			  // let it happen, don't do anything
			return;
			}
			if ([ 110, 190 ].indexOf(e.keyCode) !== -1) {
			this.lastKeyCode = true ;
			return;
			}
			// Ensure that it is a number and stop the keypress
			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				e.preventDefault();
			}
		}
	}

	@HostListener('input', ['$event.target.value'])
	onInput(value) {
		this.transform(value);
	}

	@HostListener('focus', ['$event.target.value'])
	onFocus(value) {
		this.transform(value);
	}

	validate(c: AbstractControl) {

		let resp: StatusResponse;

		if (!c.value) { return null; }
		this.validateNumericInput.value  = c.value;
		this.validateNumericInput.tipoInput = this.typeInputLen;

		const fnArray: string[]   = [];
		if (this.ThousandSeparator) {
			fnArray.push('validateThousandSeparator');
		}

		if (this.validateBiggerThanCero) {
			fnArray.push('validateBiggerThanCero');
		}

			fnArray.push('validateEndChar', 'validateNumberLen');

		for (const fn in fnArray) {
			if (fnArray.hasOwnProperty(fn)) {
			resp =	this.validateNumericInput[fnArray[fn]]();
			if (!resp.status) { return this.evalResp(resp); }
			}
		}
			return null;
		}

		private evalResp (resp: StatusResponse ) {
			console.log(resp.error);
			
			return { appCurrencyNumericInput: {error: resp.status } };
		}

	registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

	ngOnChanges(changes: SimpleChanges): void {

	if ('appCurrencyNumericInput' in changes) {
			if (this._onChange) { this._onChange(); }
		}
	}

	private transform (x: string) {
		if (this.ThousandSeparator) {
			this.el.nativeElement.value = this.formatSeparator(x);
		} else {
			this.el.nativeElement.value = this.OnlyOneDescimalSeparator(x);
		}
	}

	private OnlyOneDescimalSeparator(x: string): string {
		const parts = x
		// replace leading zeroes
		.replace( /^0+/, '0')
		// replace 2 or more consecutive points only happens when paste
		.replace(/[.]{2,}/ , '.')
		// find the the last point and replace it with c0mma ""IF"" the user
		// INPUT the point,  which means that he wants to pass to decimals
		.replace(/(\.)(?!.*\.)/g,  (  ) => {
				return (this.lastKeyCode)  ? ',' : '.';
		})
		// check if exist only one ',' in the string
		.replace(/[\,\%]/g, (match, offset, all) => {
			return match === ',' ? (all.indexOf(',') === offset ? ',' : '') : '';
			});
			this.lastKeyCode = false;
			return parts;
	}

	private formatSeparator(x: string): string {
		const parts = this.OnlyOneDescimalSeparator(x)
				.replace(/\./g, '')
						.toString()
							.split(',');

				parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
				return parts.join(',');
	}
}
