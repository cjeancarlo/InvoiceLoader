import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoicesGridComponent } from './components/invoices-grid/invoices-grid.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { InvoicesInlineFormComponent } from './components/inline-form/invoices-inline-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PadZerosPipe } from './pipes/pad-zeros.pipe';
import { WheaterComponent } from './components/wheater/wheater.component';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    InvoicesInlineFormComponent,
    InvoicesGridComponent,
    InvoicesComponent,
    PadZerosPipe,
    WheaterComponent,
    CustomCurrencyPipe  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
