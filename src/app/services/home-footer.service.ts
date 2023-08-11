import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IConfig } from '../models/config';
import { ITeamsAndSellers } from '../models/home';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class HomeFooterService {
  constructor(private http: HttpService) {}

  getConfig() {
    return this.http.get<IConfig>('home/config');
  }

  getTeamsAndSellers() {
    return this.http.get<ITeamsAndSellers>('home/teams-sellers');
  }

  getReleases() {
    return this.http.get<IProduct[]>('home/releases');
  }
}
