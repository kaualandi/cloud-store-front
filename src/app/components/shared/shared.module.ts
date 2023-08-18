import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { IconDirective } from 'src/app/directives/icon.directive';
import { InputFileDirective } from 'src/app/directives/input-file.directive';
import { SwiperModule } from 'swiper/angular';
import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from '../login/login.component';
import { CookiesLoginComponent } from '../modals/cookies-login/cookies-login.component';
import { CarouselProductsComponent } from './carousel-products/carousel-products.component';
import { LoadingComponent } from './loading/loading.component';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { EditQuantityModalComponent } from './edit-quantity-modal/edit-quantity-modal.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    SwiperModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTabsModule,
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
    LoginComponent,
    CookiesLoginComponent,
    EditQuantityModalComponent,
    ProductListItemComponent,
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
    EditQuantityModalComponent,
    ProductListItemComponent,
  ],
})
export class SharedModule {}
