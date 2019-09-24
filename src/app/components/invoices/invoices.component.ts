import { Component, OnInit } from '@angular/core';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  constructor(private IService: InvoicesService) { }

  buttonText = 'Process and Continue';

  ngOnInit() { }

  deleteWork() {
    this.IService.deleteWork();
  }

  Process() {
    this.buttonText = !this.IService.totalScreen ? 'Back' : 'Process and Continue';
    this.IService.totalScreen = !this.IService.totalScreen;

  }

}
