import { Component, HostListener, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../../auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() showSecondNavbar = false
  
  private router: Router = inject(Router)
  cartService: CartService = inject(CartService)
  utilsService: UtilsService = inject(UtilsService)
  authService: AuthService = inject(AuthService)
  translate: TranslateService = inject(TranslateService)
  spinner: NgxSpinnerService = inject(NgxSpinnerService)

  @Input() searchText: string = '';
  productType: string = '';


  changeHandler(selectedOption: { value: string; text: string }) {
    this.productType = selectedOption.value;
  }

  headerSticky: boolean = false;

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 80) {
      this.headerSticky = true;
    } else {
      this.headerSticky = false;
    }
  }

  changeLanguage(key: string){
    this.translate.use(key)
    this.translate.langs = [key]
  }

  handleSearchSubmit() {
    this.spinner.show();
    
    // Prepare query parameters if needed
    let queryParams: any = { }

    if (this.searchText) queryParams['searchText'] = this.searchText;
    if (this.productType) queryParams['productType'] = this.productType;
  
    // Determine navigation based on the presence of query params
    const navigationPromise = Object.keys(queryParams).length
      ? this.router.navigate(['/search'], { queryParams })
      : this.router.navigateByUrl('/search');
  
    // Hide spinner after navigation completes
    navigationPromise.then(() => this.spinner.hide());
  }
  
}
