import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICartItem } from 'src/app/models/cart';
import { BodyJson, HttpService } from './http.service';
import { StorageService } from './storage.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private http: HttpService,
    private storage: StorageService,
    private snackbar: SnackbarService
  ) {}

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

  editQuantity(cartItem: ICartItem) {
    if (this.storage.token) {
      return this.editQuantityLogged(cartItem);
    }
    return this.editQuantityGuest(cartItem);
  }

  deleteCartItem(cartItem: ICartItem) {
    if (this.storage.token) {
      return this.deleteCartItemLogged(cartItem);
    }
    return this.deleteCartItemGuest(cartItem);
  }

  private addToCartLogged(cartItem: ICartItem) {
    const body = {
      product_variant: cartItem.product_variant_id,
      quantity: cartItem.quantity,
      customization: cartItem.customization,
    } as BodyJson;

    if (cartItem.customization) {
      // eslint-disable-next-line dot-notation
      body['customization_name'] = cartItem.customization_name || '';
      // eslint-disable-next-line dot-notation
      body['customization_number'] = cartItem.customization_number || '';
    }

    return this.http.post<ICartItem>('cart', body);
  }

  private addToCartGuest(cartItem: ICartItem): Observable<ICartItem> {
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
        cartItem.quantity = exists.quantity;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      observer.next(cartItem);
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

  private editQuantityLogged(cartItem: ICartItem) {
    const body = {
      quantity: cartItem.quantity,
    } as BodyJson;

    return this.http.patch(`cart/${cartItem.id}`, body);
  }

  private editQuantityGuest(cartItem: ICartItem) {
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
        exists.quantity = cartItem.quantity;
      } else {
        this.snackbar.error('Produto não encontrado');
        observer.error();
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      observer.next(cart);
      observer.complete();
    });
  }

  private deleteCartItemLogged(cartItem: ICartItem) {
    return this.http.delete(`cart/${cartItem.id}`);
  }

  private deleteCartItemGuest(cartItem: ICartItem) {
    return new Observable((observer) => {
      const cartString = localStorage.getItem('cart');
      const cart: ICartItem[] = cartString ? JSON.parse(cartString) : [];
      const index = cart.findIndex(
        (item) =>
          item.product_variant_id === cartItem.product_variant_id &&
          item.customization === cartItem.customization &&
          item.customization_name === cartItem.customization_name &&
          item.customization_number === cartItem.customization_number
      );

      if (index !== -1) {
        cart.splice(index, 1);
      } else {
        this.snackbar.error('Produto não encontrado');
        observer.error();
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      observer.next(cart);
      observer.complete();
    });
  }
}
