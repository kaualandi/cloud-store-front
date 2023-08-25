import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IProduct, TOrderBy } from 'src/app/models/product';
import { ISection } from 'src/app/models/section';
import { ProductsService } from 'src/app/services/products.service';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @ViewChild('productsList') productsList:
    | ElementRef<HTMLDivElement>
    | undefined;

  constructor(
    private productsService: ProductsService,
    private sectionsService: SectionsService
  ) {}

  loading = false;
  orderBy = new FormControl<TOrderBy>('release');
  page = 1;
  nextPage = true;
  count = 0;

  products: IProduct[] = [];
  sections: ISection[] = [];

  ngOnInit(): void {
    this.loading = true;

    this.getSections();
    this.getProducts();

    this.orderBy.valueChanges.subscribe(() => {
      this.loading = true;
      this.products = [];
      this.getProducts();
    });
  }

  getProducts() {
    this.productsService
      .getProducts(this.page, this.orderBy.value as TOrderBy)
      .subscribe({
        next: (data) => {
          this.products = [...this.products, ...data.results];
          this.nextPage = !!data.next;
          this.count = data.count;
          this.loading = false;
          this.onScroll();
        },
      });
  }

  getSections() {
    this.sectionsService.getSections().subscribe({
      next: (data) => {
        this.sections = data.results;
      },
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (!this.productsList || this.loading) return;

    const element = this.productsList.nativeElement;
    const rect = element.getBoundingClientRect();
    const endVisible =
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight);

    if (endVisible && this.nextPage) {
      this.loading = true;
      this.page++;
      console.log('Loading more products...');

      this.getProducts();
    }
  }
}
