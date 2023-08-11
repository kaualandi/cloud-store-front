import { Component } from '@angular/core';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss'],
})
export class ReleasesComponent {
  products: IProduct[] = [];
}
