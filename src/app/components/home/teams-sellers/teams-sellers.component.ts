import { HomeFooterService } from './../../../services/home-footer.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { ITeam } from 'src/app/models/team';
import SwiperCore, { Navigation, SwiperOptions, FreeMode } from 'swiper';

SwiperCore.use([Navigation, FreeMode]);
@Component({
  selector: 'app-teams-sellers',
  templateUrl: './teams-sellers.component.html',
  styleUrls: ['./teams-sellers.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TeamsSellersComponent implements OnInit {
  constructor(private homeFooterService: HomeFooterService) {}

  loading = false;

  heart_teams: ITeam[] = [];

  products: IProduct[] = [];

  configSellers: SwiperOptions = {
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

  configTeams: SwiperOptions = {
    slidesPerView: 'auto',
    freeMode: true,
    spaceBetween: 50,
  };

  ngOnInit(): void {
    this.loading = true;
    this.getTeamsAndSellers();
  }

  getTeamsAndSellers() {
    this.homeFooterService.getTeamsAndSellers().subscribe({
      next: (res) => {
        this.heart_teams = res.teams;
        this.products = res.products;
        this.loading = false;
      },
    });
  }
}
