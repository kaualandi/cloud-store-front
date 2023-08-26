import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ICartItem } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
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
    private router: Router
  ) {}

  selectAll = new FormControl(false);

  selectedFormArray = this.fb.array([new FormControl(false)]);

  cart: ICartItem[] = [];

  totalValue = 0;
  discountValue = 0;
  customizationFee = this.storage.config.customization_fee;
  deliveryFreePrice = this.storage.config.delivery_fee;
  deliveryFee = 10;
  freeShipping = false;

  creating = false;

  ngOnInit(): void {
    this.totalValue = 0;
    this.discountValue = 0;
    this.customizationFee = this.storage.config.customization_fee;
    this.deliveryFreePrice = this.storage.config.delivery_fee;
    this.deliveryFee = 10;
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
    this.selectedFormArray.valueChanges.subscribe((value) => {
      this.calcItems();
      const allSelected = value.every((item) => item);
      this.selectAll.setValue(allSelected, { emitEvent: false });
    });
  }

  calcItems() {
    this.totalValue = 0;
    this.discountValue = 0;

    this.cart.forEach((item, index) => {
      if (this.selectedFormArray.controls[index].value) {
        const product = item.product_variant.product;
        this.totalValue += product.base_price * item.quantity;

        const discountValue =
          product.base_price - (product.base_price * product.discount) / 100;
        this.discountValue += discountValue * item.quantity;

        if (item.customization) {
          this.totalValue += this.customizationFee;
          this.discountValue += this.customizationFee;
        }
      }
    });

    this.freeShipping = this.discountValue >= this.deliveryFreePrice;
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

    const selectedItems: ICartItem[] = [];

    this.selectedFormArray.controls.forEach((control, index) => {
      if (control.value) {
        selectedItems.push(this.cart[index]);
      }
    });

    this.storage.selectedItemsCart = selectedItems;

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
}
