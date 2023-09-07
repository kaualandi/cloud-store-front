import { Pipe, PipeTransform } from '@angular/core';
import { TOrderStatus } from '../models/order';

@Pipe({
  name: 'orderStatus',
})
export class OrderStatusPipe implements PipeTransform {
  transform(value: TOrderStatus) {
    switch (value) {
      case 'PENDING':
        return 'Pendente';
      case 'CONFIRMED':
        return 'Confirmado';
      case 'CANCELLED':
        return 'Cancelado';
      case 'SENT':
        return 'Enviado';
      case 'DELIVERED':
        return 'Entregue';
      default:
        return value;
    }
  }
}
