import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private storage: StorageService,
    private router: Router,
    private orderService: OrderService
  ) {}

  order = this.orderService.getNewOrder();
  creatingStatus: 'idle' | 'loading' | 'created' = 'idle';
  freeShipping = false;
  totalValue = 0;
  discountValue = 0;
  customizationFee = this.storage.config.customization_fee;
  deliveryFreePrice = this.storage.config.delivery_fee;
  deliveryFee = 10;

  ngOnInit(): void {
    if (this.order.selected_items_cart.length === 0) {
      this.router.navigate(['/cart']);
      return;
    }

    this.orderService.watchOrder().subscribe(() => {
      this.order = this.orderService.getNewOrder();
    });

    this.calcItems();
  }

  calcItems() {
    this.totalValue = 0;
    this.discountValue = 0;

    this.order.selected_items_cart.forEach((item) => {
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
