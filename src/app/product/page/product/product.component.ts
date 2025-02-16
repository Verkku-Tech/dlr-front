import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../shared/interfaces/product.interface';
import { ProductService } from '../../../shared/services/product.service';
import { CartService } from '../../../shared/services/cart.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  public productId: string = "";
  public product!: IProduct;
  public textMore = false;
  public loading = true;

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    public cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.productId = params.get('id') ?? "";
          this.loading = true;
          return this.productService.getProductById(this.productId);
        })
      )
      .subscribe(() => {
        this.product = this.productService.product;
        this.loading = false;

        this.productService.handleActiveVariant(this.product.productVariants[0]);

        if (this.product.productVariants.some(list => list['storageOptions'])) {
          this.productService.handleSelectedStorage(this.product.productVariants[0].storageOptions[0]);
        }
      });
  }

  handleTextToggle() {
    this.textMore = !this.textMore;
  }
}
