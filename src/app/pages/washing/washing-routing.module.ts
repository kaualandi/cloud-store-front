import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WashingComponent } from './washing.component';

const routes: Routes = [
  {
    path: '',
    component: WashingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WashingRoutingModule {}
