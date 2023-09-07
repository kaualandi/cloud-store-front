import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IAccountResume } from '../models/user';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpService) {}

  getResume() {
    return this.http.get<IAccountResume>('auth/account-resume');
  }

  getOrders() {
    return this.http.get<IOrder[]>('auth/account-orders');
  }
}
