import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconDirective } from 'src/app/directives/icon.directive';
import { InputFileDirective } from 'src/app/directives/input-file.directive';
import { InputNumberDirective } from 'src/app/directives/input-number.directive';
import { LoadingComponent } from './loading/loading.component';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { PaginationComponent } from './pagination/pagination.component';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    LoadingComponent,
    PageLoadingComponent,
    PaginationComponent,
    IconDirective,
    InputFileDirective,
    InputNumberDirective,
    ProductCardComponent,
  ],
  exports: [
    LoadingComponent,
    PageLoadingComponent,
    PaginationComponent,
    IconDirective,
    InputFileDirective,
    InputNumberDirective,
    MatButtonModule,
    ProductCardComponent,
  ],
})
export class SharedModule {}
