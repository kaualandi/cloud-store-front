import { Component, Input, ViewEncapsulation } from '@angular/core';
import { IProductImage } from 'src/app/models/product';
import SwiperCore, { Autoplay, Pagination } from 'swiper';

SwiperCore.use([Pagination, Autoplay]);

@Component({
  selector: 'app-images-carousel',
  templateUrl: './images-carousel.component.html',
  styleUrls: ['./images-carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImagesCarouselComponent {
  @Input() images: IProductImage[] = [];
}
