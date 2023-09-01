import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ICartItem } from 'src/app/models/cart';
import { TNewOrder } from 'src/app/models/order';
import { IAddress } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private storage: StorageService,
    private navbarComponent: NavbarComponent,
    private router: Router,
    private orderService: OrderService
  ) {}

  selectAll = new FormControl(false);

  selectedFormArray = this.fb.array([new FormControl(false)]);

  cart: ICartItem[] = [];

  totalValue = 0;
  discountValue = 0;
  deliveryFreePrice = this.storage.config.delivery_fee;
  freeShipping = false;
  creating = false;

  ngOnInit(): void {
    this.totalValue = 0;
    this.discountValue = 0;
    this.deliveryFreePrice = this.storage.config.delivery_fee;
    this.freeShipping = false;

    this.getCart();

    this.selectAll.valueChanges.subscribe((value) => {
      this.selectedFormArray.controls.forEach((control) => {
        control.setValue(value);
      });
    });
  }

  getCart() {
    this.cartService.getCart().subscribe((cart) => {
      this.cart = cart;

      this.selectedFormArray = this.fb.array(
        cart.map(() => new FormControl(false))
      );

      this.handleSelectObserver();
    });
  }

  handleDeleteItem(item: ICartItem) {
    const index = this.cart.indexOf(item);
    this.cart = this.cart.filter((_, i) => i !== index);
    this.selectedFormArray.removeAt(index);
  }

  handleSelectObserver() {
    this.selectedFormArray.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.calcItems();
        const allSelected = value.every((item) => item);
        this.selectAll.setValue(allSelected, { emitEvent: false });
      });
  }

  calcItems() {
    this.totalValue = 0;
    this.discountValue = 0;
    this.freeShipping = false;

    const selectedItems = this.getSelectedItemsId();
    if (!selectedItems.length) return;

    this.orderService.getPricePreOrder(selectedItems).subscribe({
      next: (prePrice) => {
        this.totalValue = prePrice.total_without_discount;
        this.discountValue = prePrice.total_with_discount;
        this.freeShipping =
          prePrice.total_with_discount >= this.deliveryFreePrice;
      },
      error: () => {
        this.freeShipping = false;
        this.totalValue = 0;
        this.discountValue = 0;
      },
    });
  }

  handleCreateOrder() {
    if (this.onDisableCreateOrder()) return;

    if (!this.storage.token) {
      this.navbarComponent.openLoginDialog(() => {
        this.ngOnInit();
      });
      return;
    }

    this.creating = true;

    const selectedItems = this.getSelectedItemsId();

    this.orderService.setNewOrder({
      address_id: 0,
      address: {} as IAddress,
      items_id: selectedItems,
    } as TNewOrder);

    setTimeout(() => {
      this.creating = false;
      this.router.navigate(['/checkout']);
    }, 1000);
  }

  onDisableCreateOrder() {
    return (
      this.creating ||
      this.totalValue === 0 ||
      this.selectedFormArray.value.every((item) => !item)
    );
  }

  getSelectedItemsId() {
    const selectedItems: number[] = [];
    this.selectedFormArray.controls.forEach((control, index) => {
      if (control.value) {
        selectedItems.push(this.cart[index].id);
      }
    });
    return selectedItems;
  }
}
