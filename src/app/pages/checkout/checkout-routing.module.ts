import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ShippingMethodsComponent } from './shipping-methods/shipping-methods.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    children: [
      {
        path: 'infors',
        component: PersonalInfoComponent,
      },
      {
        path: 'address',
        component: DeliveryAddressComponent,
      },
      {
        path: 'shipping',
        component: ShippingMethodsComponent,
      },
      {
        path: 'payment',
        component: PaymentMethodsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
