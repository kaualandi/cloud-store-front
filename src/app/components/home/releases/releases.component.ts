import { HomeFooterService } from './../../../services/home-footer.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss'],
})
export class ReleasesComponent implements OnInit {
  constructor(private homeFooterService: HomeFooterService) {}

  products: IProduct[] = [];

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.homeFooterService.getReleases().subscribe({
      next: (products) => {
        this.products = products;
      },
    });
  }
}
