import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { IProductCart } from '../../../shared/interfaces/product.interface';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-checkout-summary',
  templateUrl: './checkout-summary.component.html',
  styleUrl: './checkout-summary.component.scss'
})
export class CheckoutSummaryComponent implements OnInit{
  @Input() tittle!: string;
  items: IProductCart[] = [];
  subtotal: number = 0;
  shipping: number = 10;

  constructor(public cartService: CartService, public checkout: CheckoutService){
  }

  ngOnInit(): void {
    
    this.items = this.cartService.getCartProducts();
    this.subtotal = this.items.reduce((a, b) => a + ((b.price - (b.price * (b?.offer?.discount ?? 0)) / 100) * b.orderQuantity), 0);
  }
}
