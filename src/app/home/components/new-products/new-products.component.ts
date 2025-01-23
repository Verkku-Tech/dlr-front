import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, inject } from '@angular/core';
import { IProduct } from '../../../shared/interfaces/product.interface';
import { ProductService } from '../../../shared/services/product.service';
import { UtilsService } from '../../../shared/services/utils.service';
import brands_data from '../../../shared/data/brand-data';
import { IBrand } from '../../../shared/interfaces/brand.interface';
import { Autoplay, Navigation } from 'swiper/modules';
import Swiper from 'swiper';
import { TranslateService } from '@ngx-translate/core';
import { ProductParameters } from '../../../shared/interfaces/product-parameters.interface';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrl: './new-products.component.scss'
})
export class NewProductsComponent implements AfterViewInit, OnInit {
  
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef)
  public productService: ProductService = inject(ProductService)
  public utilsService: UtilsService = inject(UtilsService)
  public translateService: TranslateService = inject(TranslateService)

  public brands: IBrand[] = brands_data;
  public activeTab = 'Todo';

  public tabs: { key: string, description: string}[] = [
    { key: 'Todo', description: 'newProducts.all'},
    { key: 'Dispositivos Móviles', description: 'newProducts.smartPhones'},
    { key: 'Audio', description: 'newProducts.audio'},
    { key: 'Laptops', description: 'newProducts.laptops'},
    { key: 'Gaming', description: 'newProducts.gaming'},
    { key: 'Conectividad', description: 'newProducts.connectivity'},
  ]
  public itemsToShow: number =  8;
  public additionalItemsToShow: number = 4;
  public innerWidth: any;


  ngOnInit(): void {

    if(window.innerWidth <= 768){
      this.itemsToShow = 4;
    };

    this.filteredProducts = this.getFilteredProducts()
  }

  handleActiveTab(tab: string): void {
    this.activeTab = tab;
    this.filteredProducts = this.getFilteredProducts();
    this.cdr.detectChanges();
  }

  filteredProducts = this.getFilteredProducts();

  getFilteredProducts(): IProduct[] {
    if (this.activeTab === 'Todo') {
      return [...this.productService.products].slice(0, 10);
    } else if (this.activeTab === 'Dispositivos Móviles') {
      return [...this.productService.products].filter((product) => product.featured);
    } else if (this.activeTab === 'Audio') {
      return [...this.productService.products]
        // .sort((a, b) => (b.sellCount ?? 0) - (a.sellCount ?? 0))
        .slice(0, 8);
    } else {
      return [];
    }
  }

  ngAfterViewInit() {

    new Swiper('.tp-brand-1-slider-active', {
      modules: [Navigation, Autoplay],
      autoplay: {
        delay: 1500,
        disableOnInteraction: true,
      },
      loop: true,
      spaceBetween: 0,
      breakpoints: {
        '1200': {
          slidesPerView: 8,
        },
        '992': {
          slidesPerView: 8,
        },
        '768': {
          slidesPerView: 6,
        },
        '576': {
          slidesPerView: 5,
        },
        '0': {
          slidesPerView: 3,
        },
      },
    });


  }
  showMoreItems() {
    this.itemsToShow += this.additionalItemsToShow;
  }
}

