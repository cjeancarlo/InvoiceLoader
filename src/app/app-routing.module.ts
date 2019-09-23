import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicesComponent } from './components/invoices/invoices.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'invoices', pathMatch: 'full'
  },
  { path: 'invoices', component: InvoicesComponent },
  {
    path: '**',
    component: InvoicesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
