import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { ProductParameters } from '../../interfaces/product-parameters.interface';

@Component({
  selector: 'app-top-rated-products',
  templateUrl: './top-rated-products.component.html',
  styleUrls: ['./top-rated-products.component.scss']
})
export class TopRatedProductsComponent implements OnInit {

  public topRatedProducts: { product: IProduct; rating: number }[] = []
  productService: ProductService = inject(ProductService)


  ngOnInit(): void {
    const params: ProductParameters = {}
    this.productService.getProducts(params)

    this.topRatedProducts = [...this.productService.products].map((product) => {
      if (product.reviews && product.reviews.length > 0) {
        const totalRating = product.reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        const averageRating = totalRating / product.reviews.length;

        return {
          product,
          rating: parseFloat(averageRating.toFixed(1)),
        };
      }
      return undefined; 
   
    })
    .filter(
      (product): product is { product: IProduct; rating: number } =>
        product !== undefined
    ).slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  }

}
