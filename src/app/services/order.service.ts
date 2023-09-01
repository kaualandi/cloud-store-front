import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IPrePrice, TNewOrder } from '../models/order';
import { IAddress } from '../models/user';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpService) {}

  orderSubject = new Subject<void>();
  private newOrder = {
    address_id: 0,
    address: {} as IAddress,
    items_id: [] as number[],
  } as TNewOrder;

  getNewOrder() {
    return this.newOrder;
  }

  setNewOrder(items: typeof this.newOrder, eventEmit = true) {
    this.newOrder = items;
    if (eventEmit) {
      this.changeOrder();
    }
  }

  watchOrder() {
    return this.orderSubject;
  }

  unwatchOrder() {
    this.orderSubject.unsubscribe();
  }

  changeOrder(): void {
    try {
      this.orderSubject.next();
    } catch (error) {
      console.log('Nada inscrito');
    }
  }

  getPricePreOrder(items?: number[]) {
    !items && (items = this.newOrder.items_id);

    return this.http.post<IPrePrice>('orders/pre-price', { items });
  }
}
