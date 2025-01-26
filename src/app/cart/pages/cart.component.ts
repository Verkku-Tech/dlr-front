import { Component, inject } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cartService = inject(CartService)
  productService = inject(ProductService)
  couponCode: string = '';
  shipCost: number = 0;


}
