import { IConfigTag } from './../../models/config';
import { HomeFooterService } from './../../services/home-footer.service';
import { StorageService } from './../../services/storage.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Autoplay, Navigation, FreeMode } from 'swiper';

SwiperCore.use([Navigation, Autoplay, FreeMode]);
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(
    private storage: StorageService,
    private homeFooterService: HomeFooterService
  ) {}

  loading = false;

  autoplayConfig = {
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
    delay: 5000,
  };

  tape_texts: IConfigTag[] = [];

  page_links = [
    {
      text: 'Início',
      link: '/',
    },
    {
      text: 'Produtos',
      link: '/products',
    },
    {
      text: 'Contato',
      link: '/contact',
    },
    {
      text: 'Perguntas Frequentes',
      link: '/faq',
    },
    {
      text: 'Trocas e Devoluções',
      link: '/exchanges',
    },
    {
      text: 'Sobre Nós',
      link: '/about',
    },
    {
      text: 'Política de Envio',
      link: '/shipping',
    },
  ];

  ngOnInit(): void {
    this.getConfig();

    this.storage.watchUser().subscribe({
      next: () => {
        this.getMe();
      },
    });
  }

  ngOnDestroy(): void {
    this.storage.unwatchUser();
  }

  getMe() {
    this.loading = false;
    // Requisição para pegar o usuário logado
    // if (error?.status === 401) {
    //   this.storageService.logout();
    // }
  }

  getConfig() {
    this.loading = true;
    this.homeFooterService.getConfig().subscribe({
      next: (response) => {
        this.storage.config = response;
        this.tape_texts = response.tags;
        this.getMe();
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
