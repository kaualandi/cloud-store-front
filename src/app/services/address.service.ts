import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpParams } from '@angular/common/http';
import { IAddress, IViaCep } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpService) {}

  getAddressByZipCode(zipCode: string) {
    return this.http.get<IViaCep>(`https://viacep.com.br/ws/${zipCode}/json/`);
  }

  postAddress(data: IAddress) {
    const body = new HttpParams()
      .set('city', data.city || '')
      .set('complement', data.complement || '')
      .set('neighborhood', data.neighborhood || '')
      .set('number', data.number || '')
      .set('state', data.state || '')
      .set('street', data.street || '')
      .set('zip_code', data.zip_code || '');

    return this.http.post<IAddress>('address', body);
  }

  patchAddress(id: number, data: IAddress) {
    const body = new HttpParams()
      .set('city', data.city || '')
      .set('complement', data.complement || '')
      .set('neighborhood', data.neighborhood || '')
      .set('number', data.number || '')
      .set('state', data.state || '')
      .set('street', data.street || '')
      .set('zip_code', data.zip_code || '');

    return this.http.patch<IAddress>(`address/${id}`, body);
  }
}
