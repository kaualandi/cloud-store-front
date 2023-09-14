import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/order';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.scss'],
})
export class OrderListItemComponent implements OnInit {
  @Input() order = {} as IOrder;
  @Input() expanded = true;
  @Input() name = '';

  constructor(
    private clipboard: Clipboard,
    private snackbar: SnackbarService
  ) {}

  progress = 3;
  totalItems = 0;

  ngOnInit(): void {
    this.totalItems = this.order.order_items?.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    let progress = 0;
    switch (this.order.status) {
      case 'PENDING':
        progress = 3;
        break;
      case 'CONFIRMED':
        progress = 35;
        break;
      case 'CANCELLED':
        progress = 100;
        break;
      case 'SENT':
        progress = 65;
        break;
      case 'DELIVERED':
        progress = 100;
        break;
      default:
        progress = 0;
    }

    setTimeout(() => {
      this.progress = progress;
    }, 500);
  }

  copyOrderId() {
    this.clipboard.copy(this.order.id.toString());
    this.snackbar.success('Código copiado');
  }

  copyTrackingNumber() {
    this.clipboard.copy(this.order.tracking_number);
    this.snackbar.success('Código copiado');
  }
}
