import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ShippingMethodsComponent } from './shipping-methods/shipping-methods.component';

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
    MatRadioModule,
    MatExpansionModule,
  ],
})
export class CheckoutModule {}
