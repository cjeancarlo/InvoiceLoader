import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Invoice } from 'src/app/interfaces/invoice';
import { InvoicesService } from 'src/app/services/invoices.service';


@Component({
  selector: 'app-invoices-inline-form',
  templateUrl: './invoices-inline-form.component.html',
  styleUrls: ['./invoices-inline-form.component.scss'],

})
export class InvoicesInlineFormComponent implements OnInit {

Invoiceform: FormGroup;

total: number;

constructor( private IService: InvoicesService ) { }

  ngOnInit() {
    this.Invoiceform = this.initForm();

    this.Invoiceform.valueChanges.subscribe( (val: Invoice) => {
      if (val.net && val.tax && !isNaN(val.net)) {
          val .net = this.IService.fixNumber('' + val.net);

          this.Invoiceform.get('total').setValue(val.net * (1 + val.tax / 100), {emitEvent: false});
      }
  });
  }

  initForm(): FormGroup {
    return  new FormGroup({
      number: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      net: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+([,][0-9]+)?$/), Validators.maxLength(20)]),
      tax: new FormControl('', Validators.required),
      total: new FormControl({value: '', disabled: true})
    });
  }

  addInvoice(): void {
      this.IService.add(this.Invoiceform.value);
      this.clearInvoice();
    }

  clearInvoice() {
      this.Invoiceform.reset();
  }

}
