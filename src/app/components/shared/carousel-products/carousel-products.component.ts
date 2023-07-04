import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-carousel-products',
  templateUrl: './carousel-products.component.html',
  styleUrls: ['./carousel-products.component.scss'],
})
export class CarouselProductsComponent {
  @Input() products: IProduct[] = [];

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '.arrows .next',
      prevEl: '.arrows .prev',
    },
    breakpoints: {
      490: {
        slidesPerView: 1,
      },
      610: {
        slidesPerView: 2,
      },
      740: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
      1440: {
        slidesPerView: 5,
      },
    },
  };
}
