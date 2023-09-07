import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IAccountResume } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpService) {}

  getResume() {
    return this.http.get<IAccountResume>('auth/account-resume');
  }
}
