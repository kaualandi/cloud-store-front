import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { ShippingMethodsComponent } from './shipping-methods/shipping-methods.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    CheckoutComponent,
    PersonalInfoComponent,
    DeliveryAddressComponent,
    ShippingMethodsComponent,
    PaymentMethodsComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
  ],
})
export class CheckoutModule {}
