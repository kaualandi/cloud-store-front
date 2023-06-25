import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/components/shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HeroComponent } from '../../components/home/hero/hero.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [CommonModule, SharedModule, HomeRoutingModule, SwiperModule],
  declarations: [HomeComponent, HeroComponent],
})
export class HomeModule {}
