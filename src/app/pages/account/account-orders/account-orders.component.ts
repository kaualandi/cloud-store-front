import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/order';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss'],
})
export class AccountOrdersComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  loading = false;
  orders: IOrder[] = [];

  ngOnInit(): void {
    this.loading = true;
    this.getOrders();
  }

  getOrders() {
    this.accountService.getOrders().subscribe({
      next: (response) => {
        this.orders = response;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
