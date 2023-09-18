import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard } from './guards/auth.guard';

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
        path: 'exchange',
        loadChildren: () =>
          import('./pages/exchange/exchange.module').then(
            (m) => m.ExchangeModule
          ),
      },
      {
        path: 'product/:id',
        loadChildren: () =>
          import('./pages/detail-product/detail-product.module').then(
            (m) => m.DetailProductModule
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./pages/cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./pages/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'checkout',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/checkout/checkout.module').then(
            (m) => m.CheckoutModule
          ),
      },
      {
        path: 'account',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/account/account.module').then((m) => m.AccountModule),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./pages/contact/contact.module').then((m) => m.ContactModule),
      },
      {
        path: 'faq',
        loadChildren: () =>
          import('./pages/faq/faq.module').then((m) => m.FaqModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./pages/about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'tracking',
        loadChildren: () =>
          import('./pages/tracking/tracking.module').then(
            (m) => m.TrackingModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
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
