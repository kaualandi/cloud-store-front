import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from 'src/app/models/order';

@Component({
  selector: 'app-account-order-detail',
  templateUrl: './account-order-detail.component.html',
  styleUrls: ['./account-order-detail.component.scss'],
})
export class AccountOrderDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  loading = false;
  order = {} as IOrder;
  id = 0;

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe((params) => {
      // eslint-disable-next-line dot-notation
      this.id = parseInt(params['id']);
      if (!this.id || isNaN(this.id)) {
        this.router.navigate(['/account/orders']);
      }

      this.getOrder();
    });
  }

  getOrder() {
    this.orderService.getOrder(this.id).subscribe({
      next: (response) => {
        this.order = response;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
