import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Invoice } from 'src/app/interfaces/invoice';
import { InvoicesService } from 'src/app/services/invoices.service';


@Component({
  selector: 'app-invoices-inline-form',
  templateUrl: './invoices-inline-form.component.html',
  styleUrls: ['./invoices-inline-form.component.scss']
})
export class InvoicesInlineFormComponent implements OnInit {

Invoiceform: FormGroup;

total: number;

constructor( private _invoicesService: InvoicesService ) { }

  ngOnInit() {
    this.Invoiceform = this.initForm() 

    this.Invoiceform.valueChanges.subscribe( (val: Invoice) => {
      if (val.net && val.tax) {
        this.Invoiceform.get('total').setValue(val.net * (1 + val.tax / 100), {emitEvent: false} ) 
      }
  });
  }

  initForm():FormGroup{
    return  new FormGroup({
      number: new FormControl('', Validators.required),
      net: new FormControl('', Validators.required),
      tax: new FormControl('', Validators.required),
      total: new FormControl({value:'', disabled:true})
    });
  }
  
  addInvoice(){
  
      this._invoicesService.add(this.Invoiceform.value)
      this.clearInvoice()
    }

  clearInvoice(){
      this.Invoiceform.reset();
  }
  
}
