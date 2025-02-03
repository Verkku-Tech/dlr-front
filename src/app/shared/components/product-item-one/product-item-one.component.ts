import { Component, Input } from '@angular/core';
import { IProduct } from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';
import { UtilsService } from '../../services/utils.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-item-one',
  templateUrl: './product-item-one.component.html',
  styleUrl: './product-item-one.component.scss'
})
export class ProductItemOneComponent {
  @Input() product!: IProduct;
  @Input() offer_style: Boolean | undefined;

  constructor(
    public cartService: CartService,
    // public wishlistService: WishlistService,
    public productService: ProductService,
    public utilsService: UtilsService,
  ) { }
  // add to cart
  addToCart(product: IProduct) {
    this.cartService.addCartProduct(product, this.productService.selectedVariant!, this.productService.selectedStorage);
  }
  // add to cart
  // addToWishlist(product: IProduct) {
  //   this.wishlistService.add_wishlist_product(product);
  // }

  // Function to check if an item is in the cart
  isItemInCart(item: IProduct): boolean {
    return this.cartService.getCartProducts().some((prd) => prd.id === item.id);
  }
  // isItemInWishlist(item: IProduct): boolean {
  //   return this.wishlistService.getWishlistProducts().some((prd: IProduct) => prd.id === item.id);
  // }
  
  productOutOfStock(product: IProduct): boolean {
    return product.status === 'out-of-stock' || product.qty === 0;
  }
  productIsNew(product: IProduct): boolean {
    return product.featured
  }
  productWithOffer(product: IProduct){
    const discounts = product.productVariants
      .filter(e => e.offer)
      .map(e => e.offer?.discount || 0);
    
    if (discounts.length === 0) {
      return 0;
    }
    
    return Math.max(...discounts).toFixed();
  }


  openQuickView(product: IProduct){
    this.utilsService.handleOpenModal(product.id, product)
    this.utilsService.isProductModalOpen
  }

  getPriceRange() {
    return this.productService.getProductPriceRange(this.product);
  }
}

