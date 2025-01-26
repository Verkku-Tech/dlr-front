import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProduct, IProductCart, ProductVariant, StorageOption} from '../interfaces/product.interface';
import { ProductService } from './product.service';

const state = {
  cart_products: JSON.parse(localStorage['cart_products'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public orderQuantity: number = 1;
  public isCartOpen: boolean = false;
  
  constructor(
    private toastrService: ToastrService,
    private productService: ProductService
  ) { }

  public getCartProducts(): IProductCart[] {
    return state.cart_products;
  }

  handleOpenCartSidebar () {
    this.isCartOpen = !this.isCartOpen
  }

  // add_cart_product
  addCartProduct(
    payload: IProduct, 
    productVariant: ProductVariant | undefined, 
    storageOption: StorageOption | undefined,
    orderQuantity: number = 1,
    showMsg: boolean | null = true  
  ) {

    if(!productVariant || !storageOption){
      console.error('You must select a product variant and the storage')
      return 
    }

    // FIXME: fix statuses
    // if (payload.status === 'out-of-stock' || payload.qty === 0) {
    //   this.toastrService.error(`Out of stock ${payload.name}`);
    // }

    const item: IProductCart = {
      id: payload.id ,
      name: payload.name,
      variant: productVariant.name,
      orderQuantity,
      imgUrl: productVariant.imgUrl,
      price: storageOption?.price ?? productVariant.price,
      sku: productVariant.sku,
      storage: storageOption.storage,
      offer: productVariant.offer
    }

    const exists: IProductCart | undefined = state.cart_products.find((i: IProductCart) => i.id === payload.id && i.sku === productVariant.sku);

    if(exists) {
      
      if(exists.storage && exists.storage == storageOption.storage) {
        exists.orderQuantity += orderQuantity
      }
      else{
        state.cart_products.push(item);
      }
    }
    else {
      state.cart_products.push(item);
    }

    if(showMsg)
      this.toastrService.success(`${payload.name} added to cart`);
    localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
    
  };

// total price quantity
  public totalPriceQuantity() {
    return state.cart_products.reduce(
      (cartTotal: { total: number; quantity: number }, cartItem: IProductCart) => {
        const { orderQuantity, price, offer } = cartItem;

        if (typeof orderQuantity !== undefined) {
          if (offer && offer.discount > 0) {
            
            const itemTotal = (price - (price * offer.discount) / 100) * orderQuantity;
            cartTotal.total += itemTotal;
          } else {

            const itemTotal = price * orderQuantity;
            cartTotal.total += itemTotal;
          }
          cartTotal.quantity += orderQuantity;
        }
        return cartTotal;
      },
      {
        total: 0,
        quantity: 0,
      }
    );
  };


  // quantity increment
  increment() {
    return this.orderQuantity = this.orderQuantity + 1;
  }

  // quantity decrement
  decrement() {
    return this.orderQuantity =
      this.orderQuantity > 1
        ? this.orderQuantity - 1
        : this.orderQuantity = 1;
  }

  // quantityDecrement
  quantityDecrement(payload: IProductCart) {
    state.cart_products.map((item: IProductCart) => {
      if (item.id === payload.id) {
        if (typeof item.orderQuantity !== "undefined") {
          if (item.orderQuantity > 1) {
            item.orderQuantity = item.orderQuantity - 1;
            this.toastrService.info(`Decrement Quantity For ${item.name}`);
          }
        }
      }
      return { ...item };
    });
    localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
  };

  // remover_cart_products
  removeCartProduct(payload: IProductCart) {

    state.cart_products = state.cart_products.filter(
      (p: IProductCart) => {
        if (payload.storage) {
          return !(p.sku === payload.sku && p.storage === payload.storage);
        } else {
          return p.sku !== payload.sku;
        }
      }
    );

    this.toastrService.error(`${payload.name} remove to cart`);
    localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
  };

  // clear cart
  clear_cart() {
    // const confirmMsg = window.confirm(
    //   "Are you sure deleted your all cart items ?"
    // );
    // if (confirmMsg) {
    //   state.cart_products = [];
    // }
    state.cart_products = [];
    localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
  };
  // initialOrderQuantity
  initialOrderQuantity() {
    return this.orderQuantity = 1;
  };
}
