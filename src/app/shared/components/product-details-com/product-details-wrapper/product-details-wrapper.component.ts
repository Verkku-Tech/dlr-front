import { Component, Input } from "@angular/core";
import { IProduct } from "../../../interfaces/product.interface";
import { CartService } from "../../../services/cart.service";
import { ProductService } from "../../../services/product.service";

@Component({
  selector: 'app-product-details-wrapper',
  templateUrl: './product-details-wrapper.component.html',
  styleUrls: ['./product-details-wrapper.component.scss'],
})
export class ProductDetailsWrapperComponent {
  @Input() product!: IProduct;
  @Input() isShowBottom: boolean = true;
  textMore = false;

  handleTextToggle() {
    this.textMore = !this.textMore;
  }

  constructor(
    public productService: ProductService,
    public cartService: CartService
  ) {}

  ngOnInit() {}
}
