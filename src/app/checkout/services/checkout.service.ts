import { inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../../shared/services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService implements OnInit{
  
  private validateForm = new BehaviorSubject<Function>(new Function());
  public $validateForm = this.validateForm.asObservable();

  form: FormGroup = new FormGroup("");
  router: Router = inject(Router)

  constructor(private fb: FormBuilder, private toaster: ToastrService, private cart: CartService) { }

  ngOnInit(): void {
    
  }

  validateOrderForm(){
    this.validateForm.next(() => {
      this.form.markAllAsTouched();
      if (this.form.valid)
        this.placeOrder(this.form);
    });
  }

  placeOrder(form: FormGroup){
    console.log(form.value);
    this.cart.clear_cart();
    this.toaster.success("Order placed successfully");
    this.router.navigateByUrl('/');
  }
}
