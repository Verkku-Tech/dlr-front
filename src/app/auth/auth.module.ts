import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SocialLoginComponent } from './components/social-login/social-login.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RestorePasswordComponent } from './pages/restore-password/restore-password.component';
import { RestorePasswordFormComponent } from './components/restore-password-form/restore-password-form.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginFormComponent,
    SocialLoginComponent,
    RegisterFormComponent,
    RestorePasswordComponent,
    RestorePasswordFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
