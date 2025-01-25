import { Injectable, ViewChild, inject, signal } from '@angular/core';
import { ProductService } from './product.service';
import { CartService } from './cart.service';
import { NavigationEnd, Router } from '@angular/router';
import { IProduct } from '../interfaces/product.interface';
import { ProductModalComponent } from '../components/modals/product-modal/product-modal.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  @ViewChild('productModal') modal!: ProductModalComponent;
  private popupProductIsVisibleSubject = new BehaviorSubject<Boolean>(false)
  public popupProductObserver = this.popupProductIsVisibleSubject.asObservable();

  private productService: ProductService = inject(ProductService)
  private cartService: CartService = inject(CartService)
  private router: Router = inject(Router)


	openQuickView(product: IProduct) {
    this.product = product    
    this.popupProductIsVisibleSubject.next(true)
	}

  closeQuickView(){
    this.popupProductIsVisibleSubject.next(false)
  }

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isSearchOpen = false;
        this.isProductModalOpen = false;
        this.openMobileMenus = false;
        this.removeBackdropAndProductModal()
      }
    });
  }

  // video modal
  public videoUrl: string = 'https://www.youtube.com/embed/EW4ZYb3mCZk';
  public isVideoOpen: Boolean = false;
  public isSearchOpen: Boolean = false;
  public isProductModalOpen: Boolean = false;
  public openMobileMenus: Boolean = false;
  public iframeElement: HTMLIFrameElement | null = null;
  public selectedSort = signal('')

  public product!: IProduct;

  handleOpenMobileMenu () {
    this.openMobileMenus = !this.openMobileMenus;
  };

  playVideo(videoId: string) {
    const videoOverlay = document.querySelector('#video-overlay');
    this.videoUrl = `https://www.youtube.com/embed/${videoId}`;
    if (!this.iframeElement) {
      this.iframeElement = document.createElement('iframe');
      this.iframeElement.setAttribute('src', this.videoUrl);
      this.iframeElement.style.width = '60%';
      this.iframeElement.style.height = '80%';
    }

    this.isVideoOpen = true;
    videoOverlay?.classList.add('open');
    videoOverlay?.appendChild(this.iframeElement);
  }
  

  closeVideo() {
    const videoOverlay = document.querySelector('#video-overlay.open');

    if (this.iframeElement) {
      this.iframeElement.remove();
      this.iframeElement = null;
    }

    this.isVideoOpen = false;
    videoOverlay?.classList.remove('open');
  }

  handleSearchOpen() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  
  handleOpenModal(id: string, item: IProduct) {
    this.product = item;

    this.isProductModalOpen = true;
    // FIXME: fix
    this.productService.handleActiveVariant(item.productVariants[0]);
    this.cartService.initialOrderQuantity();
    this.openQuickView(item)
  }

  removeBackdropAndProductModal() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const product_modal = document.querySelector('.tp-product-modal.show') as HTMLElement;
    if (modalBackdrop) {
      modalBackdrop.remove();
      document.body.classList.remove('modal-open');
      document.body.removeAttribute('style');
    }
    if(product_modal){
      product_modal.style.display = 'none';
    }
  }
}
