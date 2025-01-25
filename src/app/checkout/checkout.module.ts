import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CheckoutComponent } from './pages/checkout.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { CheckoutSummaryComponent } from './components/checkout-summary/checkout-summary.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutFormComponent,
    CheckoutSummaryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CheckoutRoutingModule,
    TranslateModule
  ]
})
export class CheckoutModule { }
