import { Component, inject, Input, OnInit } from "@angular/core";
import { IProduct } from "../../../interfaces/product.interface";
import { CartService } from "../../../services/cart.service";
import { ProductService } from "../../../services/product.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { UtilsService } from "../../../services/utils.service";

@Component({
  selector: 'app-product-details-wrapper',
  templateUrl: './product-details-wrapper.component.html',
  styleUrls: ['./product-details-wrapper.component.scss'],
})
export class ProductDetailsWrapperComponent implements OnInit {
  @Input() product!: IProduct;
  @Input() isShowBottom: boolean = true;
  private modalService = inject(NgbModal);
  productModal!: NgbModalRef;
  textMore = false;

  handleTextToggle() {
    this.textMore = !this.textMore;
  }

  constructor(
    public productService: ProductService,
    public cartService: CartService
  ) {
    this.modalService.activeInstances.subscribe((modal) => {
      this.productModal = modal[0];
    })
  }

  ngOnInit() {
    
  }

  close() {
    this.productModal.close()
    this.cartService.addCartProduct(this.product, this.productService.selectedVariant, this.productService.selectedStorage, this.cartService.orderQuantity, false)
  }
}
