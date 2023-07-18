import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WashingRoutingModule } from './washing-routing.module';
import { WashingComponent } from './washing.component';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  declarations: [WashingComponent],
  imports: [CommonModule, SharedModule, WashingRoutingModule],
})
export class WashingModule {}
