import { ICartItem, IProductCart } from 'src/app/models/cart';
import { IProduct } from './../../../models/product';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { EditQuantityModalComponent } from '../edit-quantity-modal/edit-quantity-modal.component';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss'],
})
export class ProductListItemComponent implements OnInit {
  @Input() product = {} as IProduct | IProductCart;
  @Input() cartItem = {} as ICartItem;
  @Output() deleted = new EventEmitter<void>();
  @Output() edited = new EventEmitter<void>();

  constructor(
    private cartService: CartService,
    private snackbar: SnackbarService,
    private dialogRef: MatDialogRef<EditQuantityModalComponent>
  ) {}

  currentPrice = 0;
  deleteLoading = false;

  ngOnInit(): void {
    this.currentPrice =
      this.product.base_price -
      (this.product.base_price * this.product.discount) / 100;
  }

  handleDeleteItem() {
    this.deleteLoading = true;
    this.cartService.deleteCartItem(this.cartItem).subscribe({
      next: () => {
        this.cartService.changeCart();
        this.snackbar.success('Item removido do carrinho');
        this.deleteLoading = false;
        this.closeDialog();
        this.deleted.emit();
      },
      error: () => {
        this.closeDialog();
      },
    });
  }

  handleEditQuantity(operation: '-' | '+') {
    if (operation === '-' && this.cartItem.quantity > 1) {
      this.cartItem.quantity--;
    } else if (operation === '+') {
      this.cartItem.quantity++;
    }

    this.cartService.editQuantity(this.cartItem).subscribe({
      next: () => {
        this.edited.emit();
      },
      error: () => {
        this.closeDialog();
      },
    });
  }

  closeDialog() {
    this.dialogRef.close && this.dialogRef?.close();
  }
}
