import { Component, OnInit, Input } from '@angular/core';
import { InvoicesService } from 'src/app/services/invoices.service';
import { Invoice } from 'src/app/interfaces/invoice';

@Component({
  selector: 'app-invoices-grid',
  templateUrl: './invoices-grid.component.html',
  styleUrls: ['./invoices-grid.component.scss']
})
export class InvoicesGridComponent implements OnInit {

  
  constructor(public  _invoicesService: InvoicesService ) { }

  ngOnInit() {
  
  }

  calculateTotal(val: Invoice){
    return val.net * (1 + val.tax / 100)
  }

  remove(id: number ){
    this._invoicesService.remove(id); 
  }

  totalInvocies() : Invoice[] 
  {
    const total: Invoice = {
      number: null,  
      net: 0,
        tax:0,
        total:0
    }

    this._invoicesService.invoicesArray.forEach(i => {
      
     total.net +=+i.net;
     total.tax +=+i.tax;
     total.total +=+i.total;
     console.log(i.net,total.net)

    })
    return  [total]   }

}
