import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product = {} as IProduct;

  discount = 0;

  ngOnInit() {
    if (this.product.discount) {
      this.discount =
        this.product.base_price -
        this.product.base_price * (this.product.discount / 100);
    }
  }
}
