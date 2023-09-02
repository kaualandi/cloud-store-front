import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PriceDeadlineCorreios } from 'src/app/models/correios';
import { CorreiosService } from 'src/app/services/correios.service';
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-shipping-methods',
  templateUrl: './shipping-methods.component.html',
  styleUrls: ['./shipping-methods.component.scss'],
})
export class ShippingMethodsComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private storage: StorageService,
    private correiosService: CorreiosService
  ) {}

  loading = false;
  error = false;
  order = this.orderService.getNewOrder();
  delivery_fee = this.storage.config.delivery_fee;
  cep = '';
  price = 0;
  quantity = 0;
  correios = {} as PriceDeadlineCorreios;
  ignoreNext = false;
  pushedCep: string | undefined = undefined;

  selectedShippingMethod = new FormControl<'sedex' | 'pac' | null>(null);

  ngOnInit(): void {
    this.orderService.watchOrder().subscribe(() => {
      if (this.ignoreNext) {
        this.ignoreNext = false;
        return;
      }

      if (this.pushedCep === this.orderService.getNewOrder().address?.zip_code)
        return;
      this.reload();
    });

    this.selectedShippingMethod.valueChanges.subscribe((value) => {
      if (value !== 'sedex' && value !== 'pac') return;

      this.order.shipping_method = value;
      this.order.shipping_price = this.correios[value].price;

      this.ignoreNext = true;
      this.orderService.setNewOrder(this.order);
    });
  }

  reload() {
    this.order = this.orderService.getNewOrder();
    this.selectedShippingMethod.setValue(null);
    this.cep = this.order.address.zip_code;
    if (!this.cep) return;
    this.price = this.order.total_with_discount;
    this.quantity = this.order.items_id.length;
    this.getPriceDeadline();
  }

  getPriceDeadline() {
    this.loading = true;
    this.error = false;
    this.correiosService
      .getPriceDeadline(this.cep, this.price, this.quantity)
      .subscribe({
        next: (correios) => {
          this.correios = correios;
          this.loading = false;
          this.error = false;
          this.pushedCep = this.cep;
          this.delivery_fee = this.storage.config.delivery_fee;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        },
      });
  }
}
