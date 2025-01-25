import { Component,inject,Input } from '@angular/core';
import { IProduct, IProductCart } from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent {
  @Input () product! : IProduct;
  
  public productService: ProductService = inject(ProductService)

  constructor(
    public cartService: CartService
  ) {}
  // add to cart
  addToCart(product: IProduct) {
    // this.cartService.addCartProduct(product, ProductServic); //El boton que llama a esta funcion se eliminara
  }

  // Function to check if an item is in the cart
  isItemInCart(item: IProduct): boolean {
    return this.cartService.getCartProducts().some((prd) => prd.id === item.id);
  }

  getCategoryNames(){

  }
}
