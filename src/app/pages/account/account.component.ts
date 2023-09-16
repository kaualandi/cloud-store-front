import { CONFIG } from './../../components/modals/confirm/confirm.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/components/modals/confirm/confirm.component';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  constructor(private storage: StorageService, private dialog: MatDialog) {}

  logout() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      ...CONFIG,
      maxWidth: '350px',
      data: {
        title: 'Sair?',
        message: 'Deseja realmente sair de sua conta?',
        buttons: 'center',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.storage.logout();
      }
    });
  }
}
