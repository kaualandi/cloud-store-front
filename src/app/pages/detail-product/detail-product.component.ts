import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  loading = false;

  // eslint-disable-next-line dot-notation
  id = Number(this.route.snapshot.params['id']);

  product = {} as IProduct;
  activedImageId = 0;

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
}
