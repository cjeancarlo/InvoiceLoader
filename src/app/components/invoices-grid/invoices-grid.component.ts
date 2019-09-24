import { Component, OnInit } from '@angular/core';
import { InvoicesService } from 'src/app/services/invoices.service';
import { Invoice } from 'src/app/interfaces/invoice';
import { simpleFadeAnimation } from 'src/app/animations/animations';

@Component({
  selector: 'app-invoices-grid',
  templateUrl: './invoices-grid.component.html',
  styleUrls: ['./invoices-grid.component.scss'],
  animations: [simpleFadeAnimation],
})
export class InvoicesGridComponent implements OnInit {

  constructor(public IService: InvoicesService) { }

  ngOnInit() { }

  calculateTotal(val: Invoice): number {
    const v = val.net * (1 + val.tax / 100);
    return isNaN(v) ? 0 : v;
  }

  remove(id: number) {
    this.IService.remove(id);
  }

  totalInvocies(): Invoice[] {
    const total: Invoice = {
      number: null,
      net: 0,
      tax: 0,
      total: 0
    };

    this.IService.invoicesArray.forEach(i => {
      total.net += +i.net;
      total.tax += +i.tax;
      total.total += +i.total;
    });
    return [total];
  }
}
