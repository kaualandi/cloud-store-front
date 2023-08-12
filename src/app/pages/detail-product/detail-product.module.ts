import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailProductRoutingModule } from './detail-product-routing.module';
import { DetailProductComponent } from './detail-product.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { AboutProductComponent } from './about/about.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [DetailProductComponent, AboutProductComponent],
  imports: [
    CommonModule,
    SharedModule,
    DetailProductRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
})
export class DetailProductModule {}
