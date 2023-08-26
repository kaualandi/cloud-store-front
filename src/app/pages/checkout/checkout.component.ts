import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(private storage: StorageService, private router: Router) {}

  cartSelectedItems = this.storage.selectedItemsCart;
  creatingStatus: 'idle' | 'loading' | 'created' = 'idle';
  freeShipping = false;
  totalValue = 0;
  discountValue = 0;
  customizationFee = this.storage.config.customization_fee;
  deliveryFreePrice = this.storage.config.delivery_fee;
  deliveryFee = 10;

  ngOnInit(): void {
    if (this.cartSelectedItems.length === 0) {
      this.router.navigate(['/cart']);
      return;
    }

    this.calcItems();
  }

  calcItems() {
    this.totalValue = 0;
    this.discountValue = 0;

    this.cartSelectedItems.forEach((item) => {
      const product = item.product_variant.product;
      this.totalValue += product.base_price * item.quantity;

      const discountValue =
        product.base_price - (product.base_price * product.discount) / 100;
      this.discountValue += discountValue * item.quantity;

      if (item.customization) {
        this.totalValue += this.customizationFee;
        this.discountValue += this.customizationFee;
      }
    });

    this.freeShipping = this.discountValue >= this.deliveryFreePrice;
  }

  handleCreateOrder() {
    if (this.creatingStatus !== 'idle') return;

    this.creatingStatus = 'loading';
    setTimeout(() => {
      this.creatingStatus = 'created';
      setTimeout(() => {
        this.creatingStatus = 'idle';
      }, 2000);
    }, 2000);
  }
}
