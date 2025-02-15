import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './page/product/product.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProductDetailsTabNavComponent } from './components/product-details-tab-nav/product-details-tab-nav.component';


@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsTabNavComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
    TranslateModule,
    NgxSpinnerModule
  ]
})
export class ProductModule { }
