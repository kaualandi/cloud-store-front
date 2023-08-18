import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICartItem } from 'src/app/models/cart';
import { IProduct } from 'src/app/models/product';

export const CONFIG = {
  maxWidth: '512px',
  width: '100%',
};

@Component({
  selector: 'app-edit-quantity-modal',
  templateUrl: './edit-quantity-modal.component.html',
  styleUrls: ['./edit-quantity-modal.component.scss'],
})
export class EditQuantityModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { product: IProduct; cartItem: ICartItem }
  ) {}

  currentPrice = 0;

  ngOnInit(): void {
    this.currentPrice =
      this.data.product.base_price -
      (this.data.product.base_price * this.data.product.discount) / 100;
  }
}
