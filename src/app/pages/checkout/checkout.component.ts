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
  deliveryFreePrice = this.storage.config.delivery_fee;
  stepsValidations = { 1: false, 2: false, 3: false, 4: false };
  disabledSubmit = true;

  selected_items: ICartItem[] = [];

  ngOnInit(): void {
    if (this.order.items_id.length === 0) {
      this.router.navigate(['/cart']);
      return;
    }

    this.orderService.watchOrder().subscribe(() => {
      this.order = this.orderService.getNewOrder();
      this.validateFields();
      this.freeShipping =
        this.order.total_with_discount >= this.deliveryFreePrice &&
        this.order.shipping_method === 'pac';
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

        this.orderService.setNewOrder(this.order);
      },
    });
  }

  handleCreateOrder() {
    if (this.creatingStatus !== 'idle' || !this.disabledSubmit) return;

    this.creatingStatus = 'loading';
    setTimeout(() => {
      this.creatingStatus = 'created';
      setTimeout(() => {
        this.creatingStatus = 'idle';
      }, 2000);
    }, 2000);
  }

  validateFields() {
    const user = this.storage.myself;
    this.stepsValidations[1] =
      !!user.id && !!user.name && !!user.email && !!user.cpf && !!user.phone;
    this.stepsValidations[2] = !!this.order.address.zip_code;
    this.stepsValidations[3] = !!this.order.shipping_method;
    this.stepsValidations[4] = false;
    console.log('this.stepsValidations', this.stepsValidations);

    this.disabledSubmit = !Object.values(this.stepsValidations).every(
      (value) => value
    );
  }
}
