import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct, ProductVariant, StorageOption } from '../../../shared/interfaces/product.interface';
import { ProductService } from '../../../shared/services/product.service';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  public idProducto: string = "";
  public product!: IProduct;
  public rating: string | undefined;
  public textMore = false;
  public category = "Products";
  public loading = true;

  constructor(private route: ActivatedRoute, public productService: ProductService, public cartService: CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idProducto = params.get('id') ?? "";
    });

    this.productService.getProductById(this.idProducto).then(() => {
      this.product = this.productService.product;
      this.productService.handleActiveVariant(this.product.productVariants[0]);
      this.productService.handleSelectedStorage(this.product.productVariants[0].storageOptions[0]);
    });

    this.loading = false;
  }
  
  handleTextToggle() {
    this.textMore = !this.textMore;
  }
}
