import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-shipping-methods',
  templateUrl: './shipping-methods.component.html',
  styleUrls: ['./shipping-methods.component.scss'],
})
export class ShippingMethodsComponent implements OnInit {
  constructor(private orderService: OrderService) {}

  order = this.orderService.getNewOrder();
  orderWatch = this.orderService.watchOrder();

  selectedShippingMethod = new FormControl(0);

  ngOnInit(): void {
    this.orderService.watchOrder().subscribe(() => {
      this.order = this.orderService.getNewOrder();
    });
  }
}
