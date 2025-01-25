import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CartSidebarComponent } from './components/offcanvas/cart-sidebar/cart-sidebar.component';
import { FooterOneComponent } from './footer/footer-one/footer-one.component';
import { HeaderCategoryComponent } from './components/header-category/header-category.component';
import { HeaderComponent } from './components/header/header.component';
import { MobileSidebarComponent } from './components/offcanvas/mobile-sidebar/mobile-sidebar.component';
import { ProductDetailsThumbComponent } from './components/product-details-com/product-details-thumb/product-details-thumb.component';
import { ProductDetailsWrapperComponent } from './components/product-details-com/product-details-wrapper/product-details-wrapper.component';
import { ProductItemOneComponent } from './components/product-item-one/product-item-one.component';
import { ProductModalComponent } from './components/modals/product-modal/product-modal.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { TopMenuSecondaryComponent } from './components/top-menu-secondary/top-menu-secondary.component';
import { VideoPopapComponent } from './components/modals/video-popap/video-popap.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { NiceSelectComponent } from './components/nice-select/nice-select.component';
import { GetProductNamesPipe } from './pipes/get-product-names.pipe';
import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { BrandFilterComponent } from './components/filtering/brand-filter/brand-filter.component';
import { CategoryFilterComponent } from './components/filtering/category-filter/category-filter.component';
import { PriceFilterComponent } from './components/filtering/price-filter/price-filter.component';
import { ResetFilterRouteComponent } from './components/filtering/reset-filter-route/reset-filter-route.component';
import { StatusFilterComponent } from './components/filtering/status-filter/status-filter.component';
import { NgxSliderModule } from 'ngx-slider-v2';
import { TopRatedProductsComponent } from './components/top-rated-products/top-rated-products.component';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { FormatTagsPipe } from './pipes/format-tags.pipe';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    TopRatedProductsComponent,
    HeaderComponent,
    TopMenuComponent,
    TopMenuSecondaryComponent,
    HeaderCategoryComponent,
    CartSidebarComponent,
    MobileSidebarComponent,
    ProductItemOneComponent,
    ProductModalComponent,
    VideoPopapComponent,
    ProductDetailsThumbComponent,
    ProductDetailsWrapperComponent,
    FooterOneComponent,
    BackToTopComponent,
    NiceSelectComponent,
    GetProductNamesPipe,
    FormatTagsPipe,
    PhoneMaskDirective,
    BrandFilterComponent,
    CategoryFilterComponent,
    PriceFilterComponent,
    ResetFilterRouteComponent,
    StatusFilterComponent,
    ProductListItemComponent,
    PaginationComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbTooltipModule,
    TranslateModule,
    NgxSliderModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    ProductItemOneComponent,
    ProductModalComponent,
    VideoPopapComponent,
    FooterOneComponent,
    BackToTopComponent,
    NiceSelectComponent,
    ReactiveFormsModule,
    FormsModule,
    GetProductNamesPipe,
    FormatTagsPipe,
    PhoneMaskDirective,
    NgbTooltipModule,
    BrandFilterComponent,
    CategoryFilterComponent,
    PriceFilterComponent,
    ResetFilterRouteComponent,
    StatusFilterComponent,
    TopRatedProductsComponent,
    ProductListItemComponent,
    PaginationComponent,
    BreadcrumbComponent
  ]
})
export class SharedModule { }
