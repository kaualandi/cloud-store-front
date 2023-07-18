import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingPolicyRoutingModule } from './shipping-policy-routing.module';
import { ShippingPolicyComponent } from './shipping-policy.component';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  declarations: [ShippingPolicyComponent],
  imports: [CommonModule, SharedModule, ShippingPolicyRoutingModule],
})
export class ShippingPolicyModule {}
