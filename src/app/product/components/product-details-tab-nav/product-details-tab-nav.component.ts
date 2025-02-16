import { Component,ElementRef,Renderer2,ViewChild,Input } from '@angular/core';
import { IProduct } from '../../../shared/interfaces/product.interface';
import { ProductService } from '../../../shared/services/product.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details-tab-nav',
  templateUrl: './product-details-tab-nav.component.html',
  styleUrls: ['./product-details-tab-nav.component.scss']
})
export class ProductDetailsTabNavComponent {
  @Input () product! : IProduct;

  constructor(
    public productService: ProductService
  ) {
  }

}
