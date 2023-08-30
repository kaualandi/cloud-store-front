import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ICartItem, IProductCart } from '../models/cart';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpService) {}

  orderSubject = new Subject<void>();
  private newOrder = {
    address_id: 0,
    selected_items_cart: [
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
    ] as ICartItem[],
  };

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
}
