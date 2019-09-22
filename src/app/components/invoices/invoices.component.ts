import { Component, OnInit } from '@angular/core';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  constructor(private _invoicesService: InvoicesService) { }


  buttonText ="Process and Continue" 
  ngOnInit() {
  }

  deleteWork(){
    this._invoicesService.deleteWork();

  }
  Process(){
      this.buttonText = !this._invoicesService.totalScreen ? "Back" : "Process and Continue" ; 
      this._invoicesService.totalScreen = !this._invoicesService.totalScreen;

      
  }

  

}
