import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-internal-restore-password-tab',
  templateUrl: './internal-restore-password-tab.component.html',
  styleUrl: './internal-restore-password-tab.component.scss'
})
export class InternalRestorePasswordTabComponent  implements AfterViewInit, OnInit {
  fb: FormBuilder = inject(FormBuilder)
  authService: AuthService = inject(AuthService)
  userService: UserService = inject(UserService)
  toastr: ToastrService = inject(ToastrService)
  router: Router = inject(Router)
  spinner: NgxSpinnerService = inject(NgxSpinnerService)
  route: ActivatedRoute = inject(ActivatedRoute)
  userId: string = '';

  isShowPass_actual: boolean = false
  isShowPass_new: boolean = false
  isShowPass_confirm: boolean = false
  
  form: FormGroup = this.fb.group({
    oldPassword: [undefined, [Validators.required, Validators.minLength(6)]],
    newPassword: [undefined, [Validators.required, Validators.minLength(6)]],
    confirmPassword: [undefined, [Validators.required, Validators.minLength(6)]]
  });
  
  constructor( ) {
    this.spinner.show()
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngAfterViewInit(): void {
    this.spinner.hide()
  }

  checkPasswords() { 
    const pass = this.form.get('newPassword')?.value;
    const confirmPass = this.form.get('confirmPassword')?.value;

    return pass === confirmPass ? null : { confirmPassword: true }     
  }

  onSubmit() {
    
    this.spinner.show()
    const { oldPassword, newPassword } = this.form.value
    const input = { id: this.userId, oldPassword, newPassword }
    this.userService.changePasswordInternal(input)
    .pipe(finalize(() => this.spinner.hide()))
    .subscribe({
      next: (result) => {
        this.toastr.success('', 'La contraseña se actualizó correctamente.', {
          positionClass: 'toast-top-right'
        });
      },
      complete: () => {
        this.router.navigateByUrl('/auth/login')
      },
      error: (err) => {
        this.toastr.error('', err.error.message, {
          positionClass: 'toast-top-right'
        })
      }
    })
  }

  get newPassword(){
    return this.form.get('newPassword')
  }
  get confirmPassword(){
    return this.form.get('confirmPassword')
  }
  get oldPassword(){
    return this.form.get('oldPassword')
  }
  get passwordMatch(): boolean {
    return this.newPassword?.value && this.confirmPassword?.value && this.newPassword.value === this.confirmPassword.value
  }
}
