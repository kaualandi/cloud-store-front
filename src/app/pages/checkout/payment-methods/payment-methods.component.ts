import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TPaymentCardMethod, TPaymentMethod } from 'src/app/models/order';
import { ISelectValue } from 'src/app/models/utils';
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
})
export class PaymentMethodsComponent implements OnInit {
  constructor(
    private storage: StorageService,
    private orderService: OrderService,
    private fb: FormBuilder
  ) {}

  loading = false;
  config = this.storage.config;
  order = this.orderService.getNewOrder();
  selectedPaymentMethod = new FormControl<TPaymentMethod | null>(null);
  cardType = new FormControl<TPaymentCardMethod>('CREDIT_CARD');
  parcels: ISelectValue[] = [];
  changeCard = false;

  cardForm = this.fb.group({
    card_number: ['', Validators.required],
    card_name: ['', Validators.required],
    card_expiration: ['', Validators.required],
    card_cvv: ['', Validators.required],
    parcels: [1],
  });

  ngOnInit(): void {
    this.buildParcels();

    this.selectedPaymentMethod.valueChanges.subscribe((value) => {
      if (!value) return;

      this.order = this.orderService.getNewOrder();

      this.order.payment_method = value;
      if (value?.includes('CARD') && this.cardType.value) {
        this.order.payment_method = this.cardType.value;

        if (this.cardForm.invalid) {
          this.changeCard = true;
        }
      } else {
        this.changeCard = false;
      }

      this.orderService.setNewOrder(this.order);
    });
    this.cardType.valueChanges.subscribe((value) => {
      if (!value) return;
      this.order = this.orderService.getNewOrder();
      this.order.payment_method = value;
      this.orderService.setNewOrder(this.order);
    });
  }

  handleFormSubmit() {
    if (!this.cardForm.valid) {
      this.cardForm.markAllAsTouched();
      return;
    }

    const year = (this.cardForm.value.card_expiration || '').substring(2);
    const currentYear = new Date().getFullYear().toString().substring(2);
    const invalidYear = parseInt(year) < parseInt(currentYear);
    const month = (this.cardForm.value.card_expiration || '').substring(0, 2);
    const currentMonth = new Date().getMonth() + 1;
    const invalidMonth =
      parseInt(month) <= currentMonth && year === currentYear;

    if (invalidYear || invalidMonth) {
      this.cardForm.get('card_expiration')?.setErrors({ invalid: true });
      return;
    }
    this.order = this.orderService.getNewOrder();
    this.order.card_number = this.cardForm.value.card_number || '';
    this.order.card_name = this.cardForm.value.card_name || '';
    this.order.card_expiration = this.cardForm.value.card_expiration || '';
    this.order.card_cvv = this.cardForm.value.card_cvv || '';
    this.orderService.setNewOrder(this.order);
    this.changeCard = false;
  }

  handleAddCardCancel() {
    this.cardForm.reset({
      parcels: 1,
    });
    this.selectedPaymentMethod.setValue(null);
    this.cardType.setValue('CREDIT_CARD');
    this.changeCard = false;
  }

  buildParcels() {
    for (let i = 1; i <= this.config.installment_limit; i++) {
      this.parcels.push({ value: i, label: `${i}x` });
    }
  }

  handleChangeCardClick() {
    this.changeCard = true;
    if (!this.selectedPaymentMethod.value?.includes('CARD')) {
      this.selectedPaymentMethod.setValue(this.cardType.value);
    }
  }
}
