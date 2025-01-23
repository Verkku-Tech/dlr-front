import { AfterViewInit, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent implements AfterViewInit {
  fb: FormBuilder = inject(FormBuilder)
  authService: AuthService = inject(AuthService)
  toastr: ToastrService = inject(ToastrService)
  router: Router = inject(Router)
  spinner: NgxSpinnerService = inject(NgxSpinnerService)

  isShowPass = false;
  keepSession: FormControl = new FormControl(false);
  
  constructor( ) {
    this.spinner.show()
  }

  ngAfterViewInit(): void {
    this.spinner.hide()
  }

  handleShowPass () {
    this.isShowPass = !this.isShowPass;
  }

  public form: FormGroup = this.fb.group({
    email: [undefined, [Validators.required, Validators.email]],
    name: [undefined, [Validators.required, Validators.maxLength(30)]],
    password: [undefined, [Validators.required, Validators.minLength(6) ]]
  });


  onSubmit() {
    this.spinner.show()
    this.authService.register(this.form.value)
    .pipe(finalize(() => this.spinner.hide()))
    .subscribe({
      next: (value) => {
        if (this.keepSession?.value) { localStorage.setItem('token', value.token) }
        else { sessionStorage.setItem('token', value.token) }
        this.authService.userId.set(value.user._id)
      },
      complete: () => {
        this.router.navigateByUrl('/')
      },
      error: (err) => {
        this.toastr.error('', err.error.message, {
          positionClass: 'toast-top-right'
        })
      }
    })
  }

  get email(){
    return this.form.get('email')
  }
  get password(){
    return this.form.get('password')
  }
  get name(){
    return this.form.get('name')
  }
}
