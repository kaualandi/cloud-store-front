import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconDirective } from 'src/app/directives/icon.directive';
import { InputFileDirective } from 'src/app/directives/input-file.directive';
import { LoadingComponent } from './loading/loading.component';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { PaginationComponent } from './pagination/pagination.component';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from './product-card/product-card.component';
import { CarouselProductsComponent } from './carousel-products/carousel-products.component';
import { SwiperModule } from 'swiper/angular';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { AddToCardButtonComponent } from './add-to-card-button/add-to-card-button.component';

@NgModule({
  imports: [
    CommonModule,
    SwiperModule,
    MatButtonModule,
    RouterModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    LoadingComponent,
    PageLoadingComponent,
    PaginationComponent,
    IconDirective,
    InputFileDirective,
    ProductCardComponent,
    CarouselProductsComponent,
    FooterComponent,
    AddToCardButtonComponent,
  ],
  exports: [
    LoadingComponent,
    PageLoadingComponent,
    PaginationComponent,
    IconDirective,
    InputFileDirective,
    MatButtonModule,
    ProductCardComponent,
    CarouselProductsComponent,
    FooterComponent,
  ],
})
export class SharedModule {}
