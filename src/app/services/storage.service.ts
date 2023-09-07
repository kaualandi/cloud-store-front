import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';
import { IConfig } from '../models/config';
import { IUser } from '../models/user';

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
  openLogin = false;

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
