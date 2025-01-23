import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './page/profile.component';
import { SharedModule } from '../shared/shared.module';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileTabComponent } from './components/profile-tab/profile-tab.component';
import { OrdersTabComponent } from './components/orders-tab/orders-tab.component';
import { InternalRestorePasswordTabComponent } from './components/internal-restore-password-tab/internal-restore-password-tab.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileTabComponent,
    OrdersTabComponent,
    InternalRestorePasswordTabComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    NgbNavModule 
  ]
})
export class ProfileModule { }
