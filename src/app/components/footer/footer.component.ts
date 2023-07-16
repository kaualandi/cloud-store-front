import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  mail = 'mailto:contato@cloudstore.com';
  wpp = 'https://wa.me/5521996953637';

  instagram = 'https://www.instagram.com/cloudstorebr/';
  facebook = 'https://www.facebook.com/cloudstorebr';
  tiktok = 'https://www.tiktok.com/@cloudstorebr';
}
