import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss']
})
export class CartSidebarComponent {

  constructor(
    public cartService:CartService,
    public productService: ProductService
  ){}
}
