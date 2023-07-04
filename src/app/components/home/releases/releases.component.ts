import { Component } from '@angular/core';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss'],
})
export class ReleasesComponent {
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
}
