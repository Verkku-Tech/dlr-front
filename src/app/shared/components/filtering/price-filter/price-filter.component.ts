import { Options } from 'ngx-slider-v2';
import { ActivatedRoute, Router } from '@angular/router';
import {Component,Output,Input,EventEmitter,Inject,PLATFORM_ID, OnChanges, SimpleChanges} from '@angular/core';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss'],
})
export class PriceFilterComponent implements OnChanges {
  @Output() priceFilter: EventEmitter<any> = new EventEmitter<any>();
  @Input() min: number = 0;
  @Input() max: number = 0;

  @Input() minValue: number = 0
  @Input() maxValue: number = 0

  public collapse: boolean = true;
  public isBrowser: boolean = false;

  public price: { minPrice: number; maxPrice: number } = {
    minPrice: this.minValue,
    maxPrice: this.maxValue
  };

  options: Options = {
    floor: this.min,
    ceil: this.max,
    hidePointerLabels: true,
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true; // for ssr
    }
  }

  ngOnChanges(changes: any): void {
    if(changes?.maxValue){
      this.maxValue = changes?.maxValue?.currentValue ?? 0
    }
    if(changes?.minValue){
      this.minValue = changes?.minValue?.currentValue ?? 0
    }
 
    this.options = {
      floor: this.min,
      ceil: this.max,
      hidePointerLabels: true,
    };
  }

  ngOnInit(): void { }

  // Range Changed
  appliedFilter(event: any) {
    this.price = { 
      minPrice: event.value, 
      maxPrice: event.highValue 
    };
    this.priceFilter.emit(this.price);
  }

  // handle price filtering
  handlePriceRoute () {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: this.price,
        queryParamsHandling: 'merge', // preserve the existing query params in the route
        skipLocationChange: false, // do trigger navigation
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products')
      });
  }
}
