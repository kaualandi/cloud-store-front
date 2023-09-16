import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-account-my-address',
  templateUrl: './account-my-address.component.html',
  styleUrls: ['./account-my-address.component.scss'],
})
export class AccountMyAddressComponent {
  constructor(private storage: StorageService) {}

  loading = false;

  user = this.storage.myself;
}
