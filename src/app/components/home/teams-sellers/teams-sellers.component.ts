import { Component } from '@angular/core';

@Component({
  selector: 'app-teams-sellers',
  templateUrl: './teams-sellers.component.html',
  styleUrls: ['./teams-sellers.component.scss'],
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
}
