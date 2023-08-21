import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IProduct } from '../models/product';
import { HttpParams } from '@angular/common/http';
import { IPagedReq } from '../models/utils';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpService) {}

  getProducts(page: number) {
    const query = new HttpParams().set('page', page).set('page_size', 20);
    return this.http.get<IPagedReq<IProduct>>(`products/`, query);
  }

  getProductById(id: number) {
    return this.http.get<IProduct>(`products/${id}`);
  }
}
