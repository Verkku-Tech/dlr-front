import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './page/home.component';
import { SharedModule } from '../shared/shared.module';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { IdealProductComponent } from './components/ideal-product/ideal-product.component';
import { NewProductsComponent } from './components/new-products/new-products.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ChoiceYourTeamComponent } from './components/choice-your-team/choice-your-team.component';
import { PromotionAndSubscriptionsComponent } from './components/promotion-and-subscriptions/promotion-and-subscriptions.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    HomeComponent,
    HeroBannerComponent,
    IdealProductComponent,
    NewProductsComponent,
    FeaturedProductsComponent,
    ChoiceYourTeamComponent,
    PromotionAndSubscriptionsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    TranslateModule
  ]
})
export class HomeModule { }
