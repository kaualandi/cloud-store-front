import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { AccountMyDataComponent } from './account-my-data/account-my-data.component';
import { AccountOrderDetailComponent } from './account-order-detail/account-order-detail.component';
import { AccountOrdersComponent } from './account-orders/account-orders.component';
import { AccountResumeComponent } from './account-resume/account-resume.component';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { MatNativeDateModule } from '@angular/material/core';
import { AccountMyAddressComponent } from './account-my-address/account-my-address.component';
import { AccountAddressDetailComponent } from './account-address-detail/account-address-detail.component';
import { AccountPasswordComponent } from './account-password/account-password.component';

@NgModule({
  declarations: [
    AccountComponent,
    AccountResumeComponent,
    AccountOrdersComponent,
    AccountOrderDetailComponent,
    AccountMyDataComponent,
    AccountMyAddressComponent,
    AccountAddressDetailComponent,
    AccountPasswordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule,
    NgxMaskModule.forRoot(),
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class AccountModule {}
