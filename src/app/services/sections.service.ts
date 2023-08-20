import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpParams } from '@angular/common/http';
import { IPagedReq } from '../models/utils';
import { ISection } from '../models/section';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
  constructor(private http: HttpService) {}

  getSections() {
    const query = new HttpParams().set('page', '1').set('page_size', '100');
    return this.http.get<IPagedReq<ISection>>('/sections', query);
  }
}
