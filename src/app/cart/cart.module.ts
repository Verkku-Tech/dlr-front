import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './pages/cart.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    TranslateModule,
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }
