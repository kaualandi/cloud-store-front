/* eslint-disable dot-notation */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICreatedOrder, IPrePrice, TNewOrder } from '../models/order';
import { IAddress } from '../models/user';
import { BodyJson, HttpService } from './http.service';

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

  createOrder(order: TNewOrder) {
    const body = {
      address_id: order.address_id,
      total: order.total_with_discount + order.shipping_price,
      delivery_fee: order.shipping_price,
      delivery_method: order.shipping_method,
      cart_ids: order.items_id,
      payment_method: order.payment_method,
    } as BodyJson;

    if (order.payment_method.includes('CARD')) {
      body['card_number'] = order.card_number;
      body['card_validity'] = order.card_expiration;
      body['card_cvv'] = order.card_cvv;
      body['card_holder_name'] = order.card_name;
    }
    if (order.payment_method === 'CREDIT_CARD') {
      body['installments'] = order.installments;
    }

    return this.http.post<ICreatedOrder>('orders', body);
  }
}
