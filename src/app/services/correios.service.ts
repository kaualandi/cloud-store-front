import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpParams } from '@angular/common/http';
import { PriceDeadlineCorreios } from '../models/correios';

@Injectable({
  providedIn: 'root',
})
export class CorreiosService {
  constructor(private http: HttpService) {}

  getPriceDeadline(cep: string, price: number, quantity: number) {
    const params = new HttpParams()
      .set('destination_zip_code', cep)
      .set('price', price.toString())
      .set('products_quantity', quantity.toString());

    return this.http.get<PriceDeadlineCorreios>(
      'correios/price-deadline',
      params
    );
  }
}
