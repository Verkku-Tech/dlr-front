import { Component, Input } from "@angular/core";
import { IProduct } from "../../../interfaces/product.interface";
import { ProductService } from "../../../services/product.service";
import { UtilsService } from "../../../services/utils.service";

@Component({
  selector: 'app-product-details-thumb',
  templateUrl: './product-details-thumb.component.html',
  styleUrls: ['./product-details-thumb.component.scss'],
})
export class ProductDetailsThumbComponent {
  @Input() product!: IProduct;

  constructor(
    public productService: ProductService,
    public utilsService: UtilsService
  ) {}

  ngOnInit() {
    if (this.product) {
      this.productService.activeImg = this.productService.getDefaultImg(this.product)
    }
  }

  get windowInnerWidth(){
    return window.innerWidth
  }
}
