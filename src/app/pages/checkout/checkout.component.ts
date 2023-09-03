import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ICartItem } from 'src/app/models/cart';
import { TNewOrder } from 'src/app/models/order';
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
    private orderService: OrderService,
    private fb: FormBuilder
  ) {}

  order = this.orderService.getNewOrder();
  creatingStatus: 'idle' | 'loading' | 'created' = 'idle';
  freeShipping = false;
  totalValue = 0;
  discountValue = 0;
  deliveryFreePrice = this.storage.config.delivery_fee;
  stepsValidations = { 1: false, 2: false, 3: false, 4: false };
  disabledSubmit = true;

  cupomDiscount = 0;
  cupomError = false;
  cupomForm = this.fb.group({
    value: new FormControl(''),
  });

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
        this.cupomError = !prePrice.cupom_status && !!this.order.cupom;
        this.cupomDiscount = prePrice.cupom_discount;
        this.order = {
          ...this.order,
          ...prePrice,
        };

        this.orderService.setNewOrder(this.order);
      },
    });
  }

  handleCreateOrder() {
    if (this.creatingStatus !== 'idle' || this.disabledSubmit) return;
    if (this.validateFields()) return;

    this.creatingStatus = 'loading';

    this.orderService.createOrder(this.order).subscribe({
      next: (order) => {
        this.orderService.setNewOrder({} as TNewOrder, false);
        this.storage.changeUser();
        this.creatingStatus = 'created';
        setTimeout(() => {
          this.creatingStatus = 'idle';
          this.router.navigate(['/account/orders', order.order_id]);
        }, 2000);
      },
      error: (err) => {
        console.log('err', err);
        this.creatingStatus = 'idle';
      },
    });
  }

  validateFields() {
    const user = this.storage.myself;
    this.stepsValidations[1] =
      !!user.id && !!user.name && !!user.email && !!user.cpf && !!user.phone;
    this.stepsValidations[2] = !!this.order.address.zip_code;
    this.stepsValidations[3] = !!this.order.shipping_method;
    this.stepsValidations[4] = !!this.order.payment_method;
    if (this.order.payment_method?.includes('CARD')) {
      this.stepsValidations[4] =
        this.stepsValidations[4] &&
        !!this.order.card_number &&
        !!this.order.card_name &&
        !!this.order.card_expiration &&
        !!this.order.card_cvv;
    }

    this.disabledSubmit = !Object.values(this.stepsValidations).every(
      (value) => value
    );

    return this.disabledSubmit;
  }

  handleApplyCupom() {
    const cupom = this.cupomForm.get('value')?.value;
    if (!cupom) return;
    this.order.cupom = cupom;
    this.orderService.setNewOrder(this.order, false);
    this.calcItems();
  }
}
