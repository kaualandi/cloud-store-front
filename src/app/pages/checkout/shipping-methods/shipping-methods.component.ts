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

  order = this.orderService.getNewOrder();
  delivery_fee = this.storage.config.delivery_fee;
  cep = '';
  price = 0;
  quantity = 0;
  correios = {} as PriceDeadlineCorreios;

  loading = false;
  error = false;

  selectedShippingMethod = new FormControl(0);

  ngOnInit(): void {
    this.orderService.watchOrder().subscribe(() => {
      this.reload();
    });
  }

  reload() {
    this.order = this.orderService.getNewOrder();
    console.log(this.order);

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
          this.delivery_fee = this.storage.config.delivery_fee;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        },
      });
  }
}
