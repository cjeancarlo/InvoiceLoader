import { Injectable } from '@angular/core';
import { Invoice } from '../interfaces/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  totalScreen = false;
  invoicesArray: Invoice[] = [];

  constructor() {
    if (localStorage.getItem('invoices')) {
      this.invoicesArray = JSON.parse(localStorage.getItem('invoices'));
    }
  }

  add(i: Invoice) {
    i.id = this.invoicesArray ? this.invoicesArray.length + 1 : 1;
    i.net = this.fixNumber('' + i.net);
    this.invoicesArray.push(i);
    this.updateStorage();
  }

  remove(id: number) {
    this.invoicesArray.splice(
      this.invoicesArray.findIndex(v => v.id === id), 1
    );

    this.updateStorage();
  }

  deleteWork() {
    this.invoicesArray = [];
    localStorage.clear();
  }

  private updateStorage() {
    localStorage.setItem('invoices', JSON.stringify(this.invoicesArray));
  }

  fixNumber(n: string): number {
    return +('' + n).replace(',', '.');
  }

}
