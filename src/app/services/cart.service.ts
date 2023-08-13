import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICartItem } from 'src/app/models/cart';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpService, private storage: StorageService) {}

  cartSubject = new Subject<void>();

  watchCart() {
    return this.cartSubject.asObservable();
  }

  unwatchCart() {
    this.cartSubject.unsubscribe();
  }

  changeCart(): void {
    this.cartSubject.next();
  }

  addToCart(cartItem: ICartItem) {
    console.log(cartItem);

    if (this.storage.token) {
      return this.addToCartLogged(cartItem);
    }
    return this.addToCartGuest(cartItem);
  }

  getCart() {
    if (this.storage.token) {
      return this.getCartLogged();
    }
    return this.getCartGuest();
  }

  private addToCartLogged(cartItem: ICartItem) {
    let body = new HttpParams()
      .set('product_variant', cartItem.product_variant_id)
      .set('quantity', cartItem.quantity)
      .set('customization', cartItem.customization);

    if (cartItem.customization) {
      body = body
        .set('customization_name', cartItem.customization_name)
        .set('customization_number', cartItem.customization_number);
    }

    return this.http.post('cart', body);
  }

  private addToCartGuest(cartItem: ICartItem): Observable<ICartItem[]> {
    return new Observable((observer) => {
      const cartString = localStorage.getItem('cart');
      const cart: ICartItem[] = cartString ? JSON.parse(cartString) : [];
      const exists = cart.find(
        (item) =>
          item.product_variant_id === cartItem.product_variant_id &&
          item.customization === cartItem.customization &&
          item.customization_name === cartItem.customization_name &&
          item.customization_number === cartItem.customization_number
      );

      if (exists) {
        exists.quantity += cartItem.quantity;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      observer.next(cart);
      observer.complete();
    });
  }

  private getCartLogged(): Observable<ICartItem[]> {
    return this.http.get<ICartItem[]>('cart');
  }

  private getCartGuest(): Observable<ICartItem[]> {
    return new Observable((observer) => {
      const cartString = localStorage.getItem('cart');
      const cart: ICartItem[] = cartString ? JSON.parse(cartString) : [];
      observer.next(cart);
      observer.complete();
    });
  }
}
