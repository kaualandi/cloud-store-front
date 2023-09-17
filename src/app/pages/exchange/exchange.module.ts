import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangeRoutingModule } from './exchange-routing.module';
import { ExchangeComponent } from './exchange.component';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  declarations: [ExchangeComponent],
  imports: [CommonModule, SharedModule, ExchangeRoutingModule],
})
export class ExchangeModule {}
