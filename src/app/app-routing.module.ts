import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

const SPR = true;

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'privacy',
        loadChildren: () =>
          import('./pages/privacy-policy/privacy-policy.module').then(
            (m) => m.PrivacyPolicyModule
          ),
      },
      {
        path: 'washing',
        loadChildren: () =>
          import('./pages/washing/washing.module').then((m) => m.WashingModule),
      },
      {
        path: 'shipping',
        loadChildren: () =>
          import('./pages/shipping-policy/shipping-policy.module').then(
            (m) => m.ShippingPolicyModule
          ),
      },
      {
        path: 'product/:id',
        loadChildren: () =>
          import('./pages/detail-product/detail-product.module').then(
            (m) => m.DetailProductModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: SPR ? 'enabled' : 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
