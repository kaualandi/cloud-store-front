import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product = {} as IProduct;

  discount?: number;

  ngOnInit() {
    if (this.product.old_price !== this.product.price) {
      this.discount = Math.round(
        ((this.product.price - this.product.old_price) /
          this.product.old_price) *
          100
      );
    }
  }
}
