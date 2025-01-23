import { Component, inject, OnInit } from '@angular/core';
import { UtilsService } from '../../../shared/services/utils.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss'
})
export class FeaturedProductsComponent implements OnInit {
  
  public utilsService: UtilsService = inject(UtilsService)
  public productService: ProductService = inject(ProductService)

  ngOnInit(): void { }

  get featuredProducts() {
    return [...this.productService.products].filter(e => e.featured)
  }

}
