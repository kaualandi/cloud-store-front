import { Component, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Autoplay, Pagination } from 'swiper';

SwiperCore.use([Pagination, Autoplay]);

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeroComponent {
  autoplayConfig = {
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
    delay: 10000,
  };

  banners = [
    {
      mobile: 'https://via.placeholder.com/500x300',
      desktop: 'https://via.placeholder.com/1920x700',
    },
    {
      mobile: 'https://via.placeholder.com/500x300',
      desktop: 'https://via.placeholder.com/1920x700',
    },
    {
      mobile: 'https://via.placeholder.com/500x300',
      desktop: 'https://via.placeholder.com/1920x700',
    },
  ];
}
