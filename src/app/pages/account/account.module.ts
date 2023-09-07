import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AccountResumeComponent } from './account-resume/account-resume.component';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  declarations: [AccountComponent, AccountResumeComponent],
  imports: [CommonModule, SharedModule, AccountRoutingModule],
})
export class AccountModule {}
