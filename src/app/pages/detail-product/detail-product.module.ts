import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailProductRoutingModule } from './detail-product-routing.module';
import { DetailProductComponent } from './detail-product.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { AboutProductComponent } from '../../components/detail-product/about/about.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SwiperModule } from 'swiper/angular';
import { ImagesCarouselComponent } from '../../components/detail-product/images-carousel/images-carousel.component';

@NgModule({
  declarations: [DetailProductComponent, AboutProductComponent, ImagesCarouselComponent],
  imports: [
    CommonModule,
    SharedModule,
    DetailProductRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    SwiperModule,
  ],
})
export class DetailProductModule {}
