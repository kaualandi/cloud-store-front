import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { IUser } from '../models/user';
import { IConfig } from '../models/config';
import { ICartItem, IProductCart } from '../models/cart';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  UserSubject = new Subject<void>();
  private myUser: IUser = {} as IUser;
  private _config: IConfig = {} as IConfig;
  private _selectedItemsCart: ICartItem[] = [
    {
      id: 21,
      product_variant_id: 37,
      quantity: 1,
      customization: false,
      customization_name: null,
      customization_number: null,
      product_variant: {
        id: 37,
        product_id: 18,
        name: 'M',
        created_at: '2023-08-07T23:48:05.985Z',
        updated_at: '2023-08-07T23:48:05.985Z',
        product: {
          id: 18,
          name: 'Retro version 1996 Bahia away size S-XXL',
          description: 'Retro version 1996 Bahia away size S-XXL',
          base_price: 129,
          trending: false,
          discount: 0,
          team_id: 3,
          sold: 0,
          is_active: true,
          created_at: '2023-08-07T23:47:34.020Z',
          updated_at: '2023-08-07T23:47:34.020Z',
          images: [
            {
              id: 13,
              product_id: 18,
              url: 'https://cloud-store-files.s3.sa-east-1.amazonaws.com/1691452057640.jpg',
              created_at: '2023-08-07T23:47:40.365Z',
              updated_at: '2023-08-07T23:47:40.365Z',
            },
            {
              id: 14,
              product_id: 18,
              url: 'https://cloud-store-files.s3.sa-east-1.amazonaws.com/1691452061303.jpg',
              created_at: '2023-08-07T23:47:43.799Z',
              updated_at: '2023-08-07T23:47:43.799Z',
            },
            {
              id: 15,
              product_id: 18,
              url: 'https://cloud-store-files.s3.sa-east-1.amazonaws.com/1691452064275.jpg',
              created_at: '2023-08-07T23:47:47.723Z',
              updated_at: '2023-08-07T23:47:47.723Z',
            },
            {
              id: 16,
              product_id: 18,
              url: 'https://cloud-store-files.s3.sa-east-1.amazonaws.com/1691452068823.jpg',
              created_at: '2023-08-07T23:47:54.227Z',
              updated_at: '2023-08-07T23:47:54.227Z',
            },
            {
              id: 17,
              product_id: 18,
              url: 'https://cloud-store-files.s3.sa-east-1.amazonaws.com/1691452074446.jpg',
              created_at: '2023-08-07T23:47:56.773Z',
              updated_at: '2023-08-07T23:47:56.773Z',
            },
            {
              id: 18,
              product_id: 18,
              url: 'https://cloud-store-files.s3.sa-east-1.amazonaws.com/1691452076864.jpg',
              created_at: '2023-08-07T23:47:58.734Z',
              updated_at: '2023-08-07T23:47:58.734Z',
            },
            {
              id: 19,
              product_id: 18,
              url: 'https://cloud-store-files.s3.sa-east-1.amazonaws.com/1691452078890.jpg',
              created_at: '2023-08-07T23:48:00.680Z',
              updated_at: '2023-08-07T23:48:00.680Z',
            },
            {
              id: 20,
              product_id: 18,
              url: 'https://cloud-store-files.s3.sa-east-1.amazonaws.com/1691452080851.jpg',
              created_at: '2023-08-07T23:48:02.823Z',
              updated_at: '2023-08-07T23:48:02.823Z',
            },
            {
              id: 21,
              product_id: 18,
              url: 'https://cloud-store-files.s3.sa-east-1.amazonaws.com/1691452082935.jpg',
              created_at: '2023-08-07T23:48:04.493Z',
              updated_at: '2023-08-07T23:48:04.493Z',
            },
            {
              id: 22,
              product_id: 18,
              url: 'https://cloud-store-files.s3.sa-east-1.amazonaws.com/1691452084516.jpg',
              created_at: '2023-08-07T23:48:05.953Z',
              updated_at: '2023-08-07T23:48:05.953Z',
            },
          ],
        } as IProductCart,
      },
    },
    {
      id: 22,
      product_variant_id: 43,
      quantity: 1,
      customization: true,
      customization_name: 'Kauaaa',
      customization_number: 4,
      product_variant: {
        id: 43,
        product_id: 19,
        name: 'G',
        created_at: '2023-08-09T00:49:19.602Z',
        updated_at: '2023-08-09T00:49:19.602Z',
        product: {
          id: 19,
          name: 'Players Jeddah United Home',
          description: 'Players Jeddah United Home',
          base_price: 129,
          trending: false,
          discount: 15,
          team_id: 3,
          sold: 0,
          is_active: true,
          created_at: '2023-08-09T00:49:05.831Z',
          updated_at: '2023-08-09T00:49:05.831Z',
          images: [
            {
              id: 23,
              product_id: 19,
              url: 'https://cloud-store-files.s3.sa-east-1.amazonaws.com/1691542147627.jpg',
              created_at: '2023-08-09T00:49:09.161Z',
              updated_at: '2023-08-09T00:49:09.161Z',
            },
            {
              id: 24,
              product_id: 19,
              url: 'https://cloud-store-files.s3.sa-east-1.amazonaws.com/1691542149252.jpg',
              created_at: '2023-08-09T00:49:10.725Z',
              updated_at: '2023-08-09T00:49:10.725Z',
            },
            {
              id: 25,
              product_id: 19,
              url: 'https://cloud-store-files.s3.sa-east-1.amazonaws.com/1691542150814.jpg',
              created_at: '2023-08-09T00:49:12.409Z',
              updated_at: '2023-08-09T00:49:12.409Z',
            },
            {
              id: 26,
              product_id: 19,
              url: 'https://cloud-store-files.s3.sa-east-1.amazonaws.com/1691542152508.jpg',
              created_at: '2023-08-09T00:49:14.190Z',
              updated_at: '2023-08-09T00:49:14.190Z',
            },
            {
              id: 27,
              product_id: 19,
              url: 'https://cloud-store-files.s3.sa-east-1.amazonaws.com/1691542154281.jpg',
              created_at: '2023-08-09T00:49:16.038Z',
              updated_at: '2023-08-09T00:49:16.038Z',
            },
            {
              id: 28,
              product_id: 19,
              url: 'https://cloud-store-files.s3.sa-east-1.amazonaws.com/1691542156159.jpg',
              created_at: '2023-08-09T00:49:17.699Z',
              updated_at: '2023-08-09T00:49:17.699Z',
            },
            {
              id: 29,
              product_id: 19,
              url: 'https://cloud-store-files.s3.sa-east-1.amazonaws.com/1691542157821.jpg',
              created_at: '2023-08-09T00:49:19.493Z',
              updated_at: '2023-08-09T00:49:19.493Z',
            },
          ],
        } as IProductCart,
      },
    },
  ];

  get myself() {
    return this.myUser;
  }

  set myself(user: IUser) {
    this.myUser = user;
  }

  get config() {
    return this._config;
  }

  set config(config: IConfig) {
    this._config = config;
  }

  get selectedItemsCart() {
    return this._selectedItemsCart;
  }

  set selectedItemsCart(items: ICartItem[]) {
    this._selectedItemsCart = items;
  }

  watchUser() {
    return this.UserSubject.asObservable();
  }

  unwatchUser() {
    this.UserSubject.unsubscribe();
  }

  changeUser(): void {
    this.UserSubject.next();
  }

  get token() {
    if (this.cookies) {
      return this.cookieService.get('token');
    } else {
      return sessionStorage.getItem('token');
    }
  }

  /**
   * Função para setar o token no cookie
   * @param token Token que vem da API
   * @param keep Se true, o cookie expira em 60 dias, se false, o cookie expira quando o browser é fechado
   * @return void
   *
   * @author Kauã Landi
   */
  setToken(token: string, keep = false): void {
    if (this.cookies) {
      this.cookieService.set(
        'token',
        token,
        keep ? 60 : undefined,
        '/',
        undefined,
        this.ssl,
        'Strict'
      );
    } else {
      sessionStorage.setItem('token', token);
    }
  }

  get cookies() {
    return localStorage.getItem('cookies') === 'true';
  }

  set cookies(value: boolean) {
    localStorage.setItem('cookies', value.toString());
  }

  logout() {
    this.cookieService.delete('token');
    this.changeUser();
    this.router.navigate(['/']);
    this.dialog.open(LoginComponent, {
      panelClass: 'login-dialog',
    });
  }

  get ssl() {
    return location.protocol === 'https:';
  }
}
