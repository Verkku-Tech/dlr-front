import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import brands_data from '../../../data/brand-data';
import { IBrand } from '../../../interfaces/brand.interface';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brand-filter',
  templateUrl: './brand-filter.component.html',
  styleUrls: ['./brand-filter.component.scss'],
})
export class BrandFilterComponent implements OnInit, OnDestroy {
  public brandsData: IBrand[] = brands_data;
  public isMobile: boolean = false;
  public activeBrand: string = '';
  private routeSubscription: Subscription = new Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productService: ProductService
  ) {}

  ngOnInit() {

    this.routeSubscription.add(
      this.route.queryParams.subscribe((parameters) => {
        this.activeBrand = ''
        if(parameters['brand']){
          this.activeBrand = parameters['brand'].replace('-',' ')
        }
      })
    )

    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile.bind(this));
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed
  }
  
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleBrandRoute(value: string) {
    const newBrand = value.toLowerCase().replace('&', '').split(' ').join('-');
    const queryParams: Params = {
      brand: newBrand,
    };
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      })
      .finally(() => {
        this.scrollToTop()
      });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    window.removeEventListener('resize', this.checkIfMobile.bind(this));
  }
}
