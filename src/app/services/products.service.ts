import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpService) {}

  getProductById(id: number) {
    return this.http.get<IProduct>(`products/${id}`);
  }
}
