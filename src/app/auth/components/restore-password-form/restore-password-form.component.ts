import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-restore-password-form',
  templateUrl: './restore-password-form.component.html',
  styleUrl: './restore-password-form.component.scss'
})
export class RestorePasswordFormComponent implements AfterViewInit, OnInit {
  fb: FormBuilder = inject(FormBuilder)
  authService: AuthService = inject(AuthService)
  toastr: ToastrService = inject(ToastrService)
  router: Router = inject(Router)
  spinner: NgxSpinnerService = inject(NgxSpinnerService)
  route: ActivatedRoute = inject(ActivatedRoute)
  userId: string = '';

  isShowConfirmPass: boolean = false
  isShowPass: boolean = false
  
  form: FormGroup = this.fb.group({
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
    const input = { id: this.userId, newPassword: this.form.value.newPassword }
    this.authService.restorePassword(input)
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
  get passwordMatch(): boolean {
    return this.newPassword?.value && this.confirmPassword?.value && this.newPassword.value === this.confirmPassword.value
  }
}
