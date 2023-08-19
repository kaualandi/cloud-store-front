import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EditQuantityModalComponent,
  CONFIG,
} from 'src/app/components/shared/edit-quantity-modal/edit-quantity-modal.component';
import { ICartItem, IProductVariantCart } from 'src/app/models/cart';
import { IProduct, IProductVariant } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailProductComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private storage: StorageService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  loading = false;
  customization_fee = this.storage.config.customization_fee;
  delivery_fee = this.storage.config.delivery_fee;
  free_shipping = this.storage.config.free_shipping;

  // eslint-disable-next-line dot-notation
  id = Number(this.route.snapshot.params['id']);

  product = {} as IProduct;
  discount = 0;
  cartItem = { customization: false, quantity: 1 } as ICartItem;
  activedImageId = 0;

  customsForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(15)]],
    number: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
  });

  addToCartStatus: 'idle' | 'loading' | 'loaded' | 'success' | 'error' = 'idle';

  ngOnInit(): void {
    if (!this.id) {
      return;
    }

    this.loading = true;
    this.getProduct();
  }

  getProduct() {
    this.productsService.getProductById(this.id).subscribe({
      next: (product) => {
        this.product = product;
        this.handleSelectSize(product.variants[0]);
        this.discount = this.product.discount
          ? this.product.base_price -
            this.product.base_price * (this.product.discount / 100)
          : 0;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
    });
  }

  handleSelectImage(index: number) {
    this.activedImageId = index;
  }

  handleSelectSize(variant: IProductVariant) {
    this.cartItem.product_variant_id = variant.id;
    const variantCart = {
      ...variant,
      product: this.product,
    } as IProductVariantCart;
    this.cartItem.product_variant = variantCart;
  }

  setCustoms(status: boolean) {
    this.cartItem.customization = status;
    this.customsForm.markAsUntouched();
  }

  handleCustomFormSubmit() {
    this.customsForm.markAllAsTouched();
  }

  addToCart() {
    if (this.addToCartStatus !== 'idle') return;

    if (this.cartItem.customization) {
      if (!this.customsForm.valid) {
        this.customsForm.markAllAsTouched();
        return;
      }

      this.cartItem.customization_name = this.customsForm.value.name || '';
      this.cartItem.customization_number =
        Number(this.customsForm.value.number) || 0;
    }

    this.addToCartStatus = 'loading';

    this.cartService.addToCart(this.cartItem).subscribe({
      next: (data) => {
        this.cartItem.quantity = data.quantity;
        this.cartItem.id = data.id || 0;

        this.handleAddToCart(true);
        this.cartService.changeCart();
      },
      error: () => {
        this.handleAddToCart(false);
      },
    });
  }

  handleAddToCart(status: boolean) {
    this.addToCartStatus = 'loaded';
    setTimeout(() => {
      this.addToCartStatus = status ? 'success' : 'error';
      setTimeout(() => {
        this.addToCartStatus = 'idle';
        status && this.showEditQuantityModal();
      }, 1000);
    }, 1000);
  }

  showEditQuantityModal() {
    const dialogRef = this.dialog.open(EditQuantityModalComponent, {
      ...CONFIG,
      data: { product: this.product, cartItem: this.cartItem },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/cart']);
      }
    });
  }
}
