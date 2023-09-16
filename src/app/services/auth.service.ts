import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IToken, IUser } from '../models/user';
import { HttpParams } from '@angular/common/http';
import { Md5 } from 'md5-typescript';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService) {}

  login(email: string, password: string) {
    const body = {
      email,
      password: Md5.init(password),
    };

    return this.http.post<IToken>('auth/login', body);
  }

  me() {
    return this.http.get<IUser>('auth/me');
  }

  updateMe(data: IUser) {
    const date = data.birth_date ? new Date(data.birth_date).toISOString() : '';

    const body = new HttpParams()
      .set('name', data.name || '')
      .set('email', data.email)
      .set('phone', data.phone || '')
      .set('cpf', data.cpf || '')
      .set('birth_date', date)
      .set('profile_url', data.profile_url || '');

    return this.http.patch<IUser>('auth/update', body);
  }
}
