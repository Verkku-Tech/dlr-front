import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.scss'
})
export class CheckoutFormComponent implements OnInit {
  @Input() tittle!: string;

  public formSubject = new BehaviorSubject<FormGroup>(new FormGroup(""));

  public $form = this.formSubject.asObservable();
  
  form: FormGroup = new FormGroup("");

  constructor(private fb: FormBuilder ,private checkout: CheckoutService) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      company: [''],
      region: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      notes: [''],
    });

    this.checkout.$validateForm.subscribe((validateForm) => {
      
      // This avoid the form to be marked as invalid on component init
      if(this.form.dirty){
        this.form.markAllAsTouched();
      }
      
      if (this.form.valid)
        this.checkout.placeOrder(this.form);
      else{
        this.form.markAsDirty();
      }
    });

    this.form.valueChanges.subscribe((value) => {
      this.checkout.form = this.form;
    });
  }
}
