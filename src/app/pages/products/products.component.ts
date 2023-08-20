import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IProduct } from 'src/app/models/product';
import { ISection } from 'src/app/models/section';
import { ProductsService } from 'src/app/services/products.service';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private sectionsService: SectionsService
  ) {}

  loading = true;
  orderBy = new FormControl('release');

  products: IProduct[] = [];
  sections: ISection[] = [];

  ngOnInit(): void {
    this.getSections();
  }

  getSections() {
    this.sectionsService.getSections().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.sections = data.results;
        }, 2000);
      },
    });
  }
}
