import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { IProduct, IProductCart, ProductVariant, StorageOption } from '../interfaces/product.interface';

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
    private translateService: TranslateService
  ) { }

  public getCartProducts(): IProductCart[] {
    return state.cart_products;
  }

  handleOpenCartSidebar() {
    this.isCartOpen = !this.isCartOpen
  }

  addCartProductFromCart(item: IProductCart) {

    const exists = state.cart_products.find((i: IProductCart) => 
      i.id === item.id && 
      i.sku === item.sku &&
      (!item.storage || i.storage === item.storage)
    );
    if (exists) {
      exists.orderQuantity += 1;
      localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
    }
  }
  addCartProduct(
    payload: IProduct,
    productVariant: ProductVariant | undefined,
    storageOption: StorageOption | undefined,
    orderQuantity: number = 1,
    showMsg: boolean | null = true
  ) {

    if (!productVariant) {
      console.error('You must select a product variant')
      return
    }

    // Only require storage selection for smartphones/mobile devices
    const isSmartphone = payload.category === 'SmartPhones' || payload.category === 'Mobile Devices'
    if(isSmartphone && !storageOption) {
      console.error('You must select a storage option for smartphones')
      return
    }

    // FIXME: fix statuses
    // if (payload.status === 'out-of-stock' || payload.qty === 0) {
    //   this.toastrService.error(`Out of stock ${payload.name}`);
    // }

    const item: IProductCart = {
      id: payload._id,
      name: payload.name,
      variant: productVariant.name,
      orderQuantity,
      imgUrl: productVariant.imgUrl,
      price: storageOption?.price ?? productVariant.price,
      sku: productVariant.sku,
      storage: isSmartphone ? storageOption?.storage : undefined,
      offer: productVariant.offer
    }

    const exists: IProductCart | undefined = state.cart_products.find((i: IProductCart) => 
      i.id === payload.id && 
      i.sku === productVariant.sku &&
      (!isSmartphone || i.storage === storageOption?.storage)
    );

    if (exists) {
      exists.orderQuantity += orderQuantity;
    }
    else {
      state.cart_products.push(item);
    }

    if (showMsg) {
      this.translateService
        .get('CART.ADDED_TO_CART', { product: payload.name })
        .subscribe((msg: string) => {
          this.toastrService.success(msg);
        });
    }
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
  public subTotalFull() {
    return state.cart_products.reduce((total: number, item: IProductCart) => {
      const itemTotal = item.price * item.orderQuantity;
      return total + itemTotal;
    }, 0);
  }

  public totalDiscount() {
    return state.cart_products.reduce((total: number, item: IProductCart) => {
      if (item.offer && item.offer.discount > 0) {
        const discountAmount = (item.price * item.offer.discount / 100) * item.orderQuantity;
        return total + discountAmount;
      }
      return total;
    }, 0);
  }

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
    if (payload.orderQuantity === 1) {
      this.removeCartProduct(payload)
    }
    else {
      state.cart_products.map((item: IProductCart) => {
        if (item.id === payload.id) {
          if (typeof item.orderQuantity !== "undefined") {
            if (item.orderQuantity > 1) {
              item.orderQuantity = item.orderQuantity - 1;
            }
          }
        }
        return { ...item };
      });
      this.translateService
        .get('CART.QUANTITY_DECREASED', { product: payload.name })
        .subscribe((msg: string) => {
          this.toastrService.info(msg);
        });
    }
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

    this.translateService
      .get('CART.REMOVED_FROM_CART', { product: payload.name })
      .subscribe((msg: string) => {
        this.toastrService.error(msg);
      });
    localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
  };

  // clear cart
  clear_cart() {
    // const confirmMsg = window.confirm(
    //   "Are you sure deleted your all cart items ?"
    // );
    // if (confirmMsg) {
    // }
    state.cart_products = [];
    localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
  };
  // initialOrderQuantity
  initialOrderQuantity() {
    return this.orderQuantity = 1;
  };
}
