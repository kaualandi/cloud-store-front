import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private storage: StorageService) {}

  config = this.storage.config;

  mail = `mailto:${this.config.email}`;
  wpp = `https://wa.me/55${this.config.whatsapp}`;

  instagram = `https://www.instagram.com/${this.config.instagram}/`;
  facebook = `https://www.facebook.com/${this.config.facebook}/`;
  tiktok = `https://www.tiktok.com/@${this.config.tiktok}/`;

  year = new Date().getFullYear();
}
