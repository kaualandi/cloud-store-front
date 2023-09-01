import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICartItem } from 'src/app/models/cart';
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

  selected_items: ICartItem[] = [];

  ngOnInit(): void {
    if (this.order.items_id.length === 0) {
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

    this.orderService.getPricePreOrder().subscribe({
      next: (prePrice) => {
        this.totalValue = prePrice.total_without_discount;
        this.discountValue = prePrice.total_with_discount;
        this.selected_items = prePrice.items;
        this.order = {
          ...this.order,
          ...prePrice,
        };

        console.log('this.order in checkout', this.order);

        this.orderService.setNewOrder(this.order);
      },
    });
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
