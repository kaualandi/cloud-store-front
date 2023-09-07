import { AuthService } from './../../services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ITag } from './../../models/config';
import { HomeFooterService } from './../../services/home-footer.service';
import { StorageService } from './../../services/storage.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Autoplay, Navigation, FreeMode } from 'swiper';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { IUser } from 'src/app/models/user';
import { Router } from '@angular/router';

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
    private homeFooterService: HomeFooterService,
    private cartService: CartService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  loading = false;
  cartLength = 0;
  user = {} as IUser;

  autoplayConfig = {
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
    delay: 5000,
  };

  tape_texts: ITag[] = [];

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

    this.cartService.watchCart().subscribe({
      next: () => {
        this.getCart();
      },
    });
  }

  ngOnDestroy(): void {
    this.storage.unwatchUser();
  }

  getMe() {
    this.authService.me().subscribe({
      next: (data) => {
        this.storage.myself = data;
        this.user = data;
        this.getCart();
      },
      error: (error) => {
        if (error.status === 401) {
          this.storage.logout();
        }
        this.user = {} as IUser;
        this.storage.myself = {} as IUser;
        this.loading = false;
      },
    });
  }

  getConfig() {
    this.loading = true;
    this.homeFooterService.getConfig().subscribe({
      next: (response) => {
        this.storage.config = response;
        this.tape_texts = response.tags;
        if (this.storage.token) this.getMe();
        if (!this.storage.token) this.getCart();
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  getCart() {
    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cartLength = response.length;
        this.loading = false;
      },
    });
  }

  handleProfileClick() {
    if (!this.storage.token) {
      return this.openLoginDialog();
    }
    return this.router.navigate(['/account']);
  }

  openLoginDialog(fb?: () => void) {
    const dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'login-dialog',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.getMe();
        if (fb) fb();
      }
    });
  }
}
