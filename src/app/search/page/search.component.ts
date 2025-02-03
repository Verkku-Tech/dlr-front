import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit, OnDestroy, inject, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';
import { UtilsService } from '../../shared/services/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { ICategory } from '../../shared/interfaces/category.interface';
import { CategoryService } from '../../shared/services/category.service';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit {

  public productService =inject(ProductService)
  public route =inject(ActivatedRoute)
  public router =inject(Router)
  public viewScroller =inject(ViewportScroller)
  public utilsService =inject(UtilsService)
  private translate = inject(TranslateService);
  private categoryService = inject(CategoryService);
  
  @Input() listStyle: boolean = false;
  @Input() full_width: boolean = false;
  @Input() shop_1600: boolean = false;
  @Input() shop_right_side: boolean = false;
  @Input() shop_no_side: boolean = false;
  
  public filteredProducts: IProduct[] = [];
  public searchText: string = '';
  public productType: string = '';
  public selectVal: string = '';
  
  public minPrice: number = 0;
  public maxPrice: number = 0;
  public maxPriceRange: number = 0;
  public minPriceRange: number = 0;


  public niceSelectOptions = [
    { value: 'asc', text:  'search.sort.default' },
    { value: 'desc', text: 'search.sort.newest' },
    { value: 'low', text: 'search.sort.priceLow' },
    { value: 'high', text: 'search.sort.priceHigh' },
    { value: 'on-sale', text: 'search.sort.onSale' },
    { value: 'category', text: 'search.sort.category' },
    { value: 'new', text: 'search.sort.newArrivals' }
  ];
  public selectOptions: {value:string, text:string}[] = this.productService.filterSelect
  public brands: string[] = [];
  public tags: string[] = [];
  public category: string | null = null;
  public status: string | null = null;
  public brand: string | null = null;
  public pageNo: number = 1;
  public pageSize: number = 6;
  public paginate: any = {}; // Pagination use only
  public sortBy: string = 'asc'; // Default sorting
  public mobileSidebar: boolean = false;
  activeTab: string = this.listStyle ? 'list' : 'grid';
  public isFilterVisible: boolean = false;
  public isMobile: boolean = false;
  private resizeListener: any;

  // select option

  public filterTitles = {
    price: 'search.filters.price',
    status: 'search.filters.status',
    categories: 'search.filters.categories',
    brands: 'search.filters.brands',
    showFilters: 'search.filters.show',
    hideFilters: 'search.filters.hide'
  };

  public emptyStateText = {
    title: 'search.empty.title',
    message: 'search.empty.message',
    imageAlt: 'search.empty.imageAlt',
    continueShopping: 'search.empty.continueShopping'
  };

  public resultsText = {
    showing: 'search.results.showing'
  };

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 992; // Bootstrap's lg breakpoint
    if (this.isMobile) {
      this.isFilterVisible = false;
    }
  }
  
  ngAfterViewInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit() {
    this.configSizeEvent();
    this.loadQueryOptions();
    this.category
  }

  private loadQueryOptions() {
    this.activeTab = this.listStyle ? 'list' : 'grid';

    this.categoryService.get()
    .pipe(
      map(categories => {
        return categories.map(e => {
          e.name.toLowerCase()
          e.parent = e.parent.map(p => p.toLowerCase())
          return e
        });
      })
    )
    .subscribe(categories => {
      this.route.queryParams.subscribe((params) => {
        this.searchText = params['searchText'] || '';
        this.productType = params['productType'] || '';
        this.selectVal = params['selectVal'] || '';
        this.sortBy = params['sortBy'] || 'asc';
        this.pageNo = params['page'] ? Number(params['page']) : 1;
        this.category = (params['category']?.toLowerCase()?.replaceAll('-',' ')) || null
        this.status = params['status'] || null;
        this.brand = params['brand'] || null;
        this.tags = params['tags'] ? params['tags'].split(',') : [];
        this.brands = params['brands'] ? params['brands'].split(',') : [];

        this.minPrice = params['minPrice'] ? Number(params['minPrice']) : 0;
        this.maxPrice = params['maxPrice'] ? Number(params['maxPrice']) : 0;
        this.loadProducts(categories);
      });
    });
  }

  private configSizeEvent() {
    this.checkScreenSize();
    this.resizeListener = () => this.checkScreenSize();
    window.addEventListener('resize', this.resizeListener);
  }

  loadProducts(categories: ICategory[] = []) {
      this.filterProducts(categories)
      this.sortProducts();
      this.paginateProducts();
  }

  filterProducts(categories: ICategory[]) {
    let filteredProducts = [...this.productService.products];
    
    this.maxPriceRange = this.maxPriceRange === 0 ? this.productService.getMaxPriceByProducts(filteredProducts) : this.maxPriceRange

     // Filter by search text
    if (this.searchText) {
      filteredProducts = filteredProducts.filter((prd) =>
        prd.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    // Filter by status (in stock, sale, etc)
    if (this.status) {
      filteredProducts = filteredProducts.filter(
        (prd) => prd.status.toLowerCase() === this.status?.toLowerCase()
      );
    }

    // Filter by category
    if (this.category) {
      const childCategories = categories.filter(c => 
        c.parent.map(p => p.toLowerCase()).includes(this.category!.toLowerCase())
      );
      
      filteredProducts = filteredProducts.filter((prd) => 
        prd.category.toLowerCase() === this.category?.toLowerCase() || 
        childCategories.some(child => prd.category.toLowerCase() === child.name.toLowerCase())
      );
    }

    // Filter by brand
    if (this.brand) {
      filteredProducts = filteredProducts.filter(
        (prd) => prd.brand.toLowerCase() === this.brand?.toLowerCase()
      );
    }

    if(!this.minPrice && !this.maxPrice){
      this.minPrice = 0;
      this.maxPrice = this.productService.getMaxPriceByProducts(filteredProducts)
    }

    // Filter by price range 
    if (this.minPrice !== undefined && this.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (prd) => this.productService.getDefaultPrice(prd) >= this.minPrice && this.productService.getDefaultPrice(prd) <= this.maxPrice
      );
    } 

    this.filteredProducts = filteredProducts
  }

  sortProducts() {
    // Find the matching option from niceSelectOptions instead of selectOptions
    const selectedOption = this.niceSelectOptions.find(option => option.value === this.sortBy);
    
    if (selectedOption) {
      this.utilsService.selectedSort.set(selectedOption.text);
    }

    switch (this.sortBy) {
      case 'asc':
        this.filteredProducts.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case 'desc':
        this.filteredProducts.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'low':
        this.filteredProducts.sort((a, b) => {
          const aRange = this.productService.getProductPriceRange(a);
          const bRange = this.productService.getProductPriceRange(b);
          return aRange.min - bRange.min;
        });
        break;
      case 'high':
        this.filteredProducts.sort((a, b) => {
          const aRange = this.productService.getProductPriceRange(a);
          const bRange = this.productService.getProductPriceRange(b);
          return bRange.max - aRange.max;
        });
        break;
      case 'on-sale':
        this.filteredProducts.sort((a, b) => {
          const aHasOffer = a.productVariants.some(v => v.offer);
          const bHasOffer = b.productVariants.some(v => v.offer);
          
          if (aHasOffer && !bHasOffer) return -1;
          if (!aHasOffer && bHasOffer) return 1;
          if (aHasOffer && bHasOffer) {
            const aRange = this.productService.getProductPriceRange(a);
            const bRange = this.productService.getProductPriceRange(b);
            return aRange.min - bRange.min;
          }
          return 0;
        });
        break;
      case 'category':
        this.filteredProducts.sort((a, b) => {
          return a.category.localeCompare(b.category);
        });
        break;
      case 'new':
        this.filteredProducts.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
        break;
      default:
        this.filteredProducts.sort((a, b) => a.id.localeCompare(b.id));
        break;
    }
  }

  paginateProducts() {
    this.paginate = this.productService.getPager(
      this.filteredProducts.length,
      this.pageNo,
      this.pageSize
    );
    this.filteredProducts = this.filteredProducts.slice(
      this.paginate.startIndex,
      this.paginate.endIndex + 1
    );
  }

  changeFilterSelect(selectedOption: any) {
    this.sortByFilter(selectedOption.value);
  }

  handleActiveTab(tab: string) {
    this.activeTab = tab;
  }

  sortByFilter(value: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortBy: value, page: 1 },
      queryParamsHandling: 'merge',
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products');
    });
  }

  handleResetFilter() {

    const filteredProducts = [...this.productService.products];

    this.minPrice = 0;
    this.maxPrice = this.productService.getMaxPriceByProducts(filteredProducts)

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { maxPrice: this.maxPrice, minPrice: 0, page: 1 }
    });
  }

  updateFilter(tags: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...tags, page: 1 },
      queryParamsHandling: 'merge',
    });
  }

  setPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('search');
    });
  }

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  ngOnDestroy() {
    // Remove the event listener when component is destroyed
    window.removeEventListener('resize', this.resizeListener);
  }
}
