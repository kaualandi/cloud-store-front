import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICartItem } from 'src/app/models/cart';
import { IProduct, IProductVariant } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private storage: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  loading = false;
  customization_fee = this.storage.config.customization_fee;
  delivery_fee = this.storage.config.delivery_fee;
  free_shipping = this.storage.config.free_shipping;

  // eslint-disable-next-line dot-notation
  id = Number(this.route.snapshot.params['id']);

  product = {} as IProduct;
  discount = 0;
  cartItem = {} as ICartItem;
  activedImageId = 0;

  customsForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(15)]],
    number: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
  });

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
    this.cartItem.product_variant = variant;
  }

  setCustoms(status: boolean) {
    this.cartItem.customization = status;
    this.customsForm.markAsUntouched();
  }

  handleCustomFormSubmit() {
    this.customsForm.markAllAsTouched();
  }
}
