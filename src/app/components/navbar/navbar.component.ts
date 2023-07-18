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
  constructor(private storage: StorageService) {}

  loading = false;

  autoplayConfig = {
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
    delay: 5000,
  };

  tape_texts = [
    {
      text: 'Frete <b>grátis</b> para todo país!',
      icon: 'truck',
    },
    {
      text: 'Use o cupom <b>DESCONTO10</b> e ganhe 10% de desconto!',
      icon: 'dollar_badge',
    },
  ];

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
    this.getMe();

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
    // Requisição para pegar o usuário logado
    // if (error?.status === 401) {
    //   this.storageService.logout();
    // }
  }
}
