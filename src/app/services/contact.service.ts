import { Injectable } from '@angular/core';
import { BodyJson, HttpService } from './http.service';
import { IContact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpService) {}

  post(contact: IContact) {
    return this.http.post('contact', contact as unknown as BodyJson);
  }
}
