import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
{
  path: '',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
},
{
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
},
{
  path: 'profile',
  loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
},
{
  path: 'search',
  loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
},
{
  path: 'checkout',
  loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)
},
{
  path: 'product/:id',
  loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
},
{
  path: '**',
  component: NotFoundComponent,
  pathMatch: 'full'
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
