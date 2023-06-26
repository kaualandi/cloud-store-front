import { Component, ViewEncapsulation } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper';

SwiperCore.use([Navigation]);
@Component({
  selector: 'app-teams-sellers',
  templateUrl: './teams-sellers.component.html',
  styleUrls: ['./teams-sellers.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TeamsSellersComponent {
  heart_teams = [
    {
      id: 1,
      name: 'Flamengo',
      img: 'https://logodetimes.com/times/flamengo/logo-flamengo-256.png',
    },
    {
      id: 2,
      name: 'São Paulo FC',
      img: 'https://logodetimes.com/times/sao-paulo/logo-sao-paulo-256.png',
    },
    {
      id: 3,
      name: 'Palmeiras',
      img: 'https://logodetimes.com/times/palmeiras/logo-palmeiras-256.png',
    },
    {
      id: 4,
      name: 'Fluminense',
      img: 'https://logodetimes.com/times/fluminense/logo-fluminense-256.png',
    },
    {
      id: 5,
      name: 'Atlético MG',
      img: 'https://logodetimes.com/times/atletico-mineiro/logo-atletico-mineiro-256.png',
    },
    {
      id: 6,
      name: 'Vasco',
      img: 'https://logodetimes.com/times/vasco-da-gama/logo-vasco-da-gama-256.png',
    },
    {
      id: 7,
      name: 'Corinthians',
      img: 'https://logodetimes.com/times/corinthians/logo-corinthians-256.png',
    },
    {
      id: 8,
      name: 'Grêmio',
      img: 'https://logodetimes.com/times/gremio/logo-gremio-256.png',
    },
    {
      id: 9,
      name: 'Cruzeiro',
      img: 'https://logodetimes.com/times/cruzeiro/logo-cruzeiro-256.png',
    },
  ];

  products: IProduct[] = [
    {
      id: 1,
      name: 'Camisa Barcelona 23/24 Treino',
      img: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/402/723/products/25dd40811-56db40ca423a8d23f216837487300426-640-0.webp',
      price: 139,
      old_price: 179,
    },
    {
      id: 2,
      name: 'Camisa Arsenal 23/24 Home',
      img: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/876/620/products/camisa-arsenal-gunners-i-home-titular-vermelha-dourada-23-24-2023-2024-modelo-player-zinchenko-jesus-odegaard-jorginho-trossard-xhaka-martinelli-partey-ramsdale-smith-rowe-magalhaes-tierney-saka-12-0598f64cfd9b78464a16804538144338-640-0.webp',
      price: 149,
      old_price: 179,
    },
    {
      id: 3,
      name: 'Camisa Inter de Milão 22/23 Home',
      img: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/631/923/products/b78946f51-c706949f1459f71d1b16626594372658-640-0.webp',
      price: 139,
      old_price: 179,
    },
    {
      id: 1,
      name: 'Camisa Barcelona 23/24 Treino',
      img: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/402/723/products/25dd40811-56db40ca423a8d23f216837487300426-640-0.webp',
      price: 139,
      old_price: 179,
    },
    {
      id: 2,
      name: 'Camisa Arsenal 23/24 Home',
      img: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/876/620/products/camisa-arsenal-gunners-i-home-titular-vermelha-dourada-23-24-2023-2024-modelo-player-zinchenko-jesus-odegaard-jorginho-trossard-xhaka-martinelli-partey-ramsdale-smith-rowe-magalhaes-tierney-saka-12-0598f64cfd9b78464a16804538144338-640-0.webp',
      price: 149,
      old_price: 179,
    },
    {
      id: 3,
      name: 'Camisa Inter de Milão 22/23 Home',
      img: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/631/923/products/b78946f51-c706949f1459f71d1b16626594372658-640-0.webp',
      price: 139,
      old_price: 179,
    },
  ];

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: {
      nextEl: '.arrows .next',
      prevEl: '.arrows .prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      610: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      860: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1100: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 70,
      },
    },
  };
}
