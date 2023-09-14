import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountResumeComponent } from './account-resume/account-resume.component';
import { AccountComponent } from './account.component';
import { AccountOrdersComponent } from './account-orders/account-orders.component';
import { AccountOrderDetailComponent } from './account-order-detail/account-order-detail.component';
import { AccountMyDataComponent } from './account-my-data/account-my-data.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        component: AccountResumeComponent,
      },
      {
        path: 'orders',
        component: AccountOrdersComponent,
      },
      {
        path: 'orders/:id',
        component: AccountOrderDetailComponent,
      },
      {
        path: 'my-data',
        component: AccountMyDataComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
