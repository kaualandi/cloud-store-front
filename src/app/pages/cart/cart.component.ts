import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ICartItem } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private fb: FormBuilder, private cartService: CartService) {}

  selectAll = new FormControl(false);

  selectedFormArray = this.fb.array([new FormControl(false)]);

  cart: ICartItem[] = [];

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartService.getCart().subscribe((cart) => {
      this.cart = cart;

      this.selectedFormArray = this.fb.array(
        cart.map((item) => new FormControl(false))
      );
    });
  }
}
