import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './page/product/product.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProductDetailsTabNavComponent } from './components/product-details-tab-nav/product-details-tab-nav.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsRatingItemComponent } from './components/product-details-rating-item/product-details-rating-item.component';
import { ShopDetailsFormComponent } from './components/shop-details-form/shop-details-form.component';


@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsTabNavComponent,
    ProductDetailsRatingItemComponent,
    ShopDetailsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
    TranslateModule,
    NgxSpinnerModule,
    NgbNavModule
  ]
})
export class ProductModule { }
