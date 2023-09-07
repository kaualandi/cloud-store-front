import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountResumeComponent } from './account-resume/account-resume.component';
import { AccountComponent } from './account.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        component: AccountResumeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
