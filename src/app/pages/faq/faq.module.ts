import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/components/shared/shared.module';
import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [FaqComponent],
  imports: [CommonModule, SharedModule, FaqRoutingModule, MatExpansionModule],
})
export class FaqModule {}
