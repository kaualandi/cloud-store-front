import { Component, Input, ViewEncapsulation } from '@angular/core';
import { IBanner } from 'src/app/models/config';
import SwiperCore, { Autoplay, Pagination } from 'swiper';

SwiperCore.use([Pagination, Autoplay]);

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeroComponent {
  @Input() banners: IBanner[] = [];

  autoplayConfig = {
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
    delay: 10000,
  };
}
