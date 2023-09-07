import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { AccountResumeComponent } from './account-resume/account-resume.component';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AccountOrdersComponent } from './account-orders/account-orders.component';

@NgModule({
  declarations: [AccountComponent, AccountResumeComponent, AccountOrdersComponent],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule,
    NgxMaskModule.forRoot(),
    MatProgressSpinnerModule,
  ],
})
export class AccountModule {}
