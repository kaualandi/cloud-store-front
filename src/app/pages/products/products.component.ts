import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  loading = true;

  products: IProduct[] = [];
  orderBy = new FormControl('release');

  ngOnInit(): void {}
}
