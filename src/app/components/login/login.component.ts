import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CookiesLoginComponent } from 'src/app/components/modals/cookies-login/cookies-login.component';
import { CartService } from 'src/app/services/cart.service';
import { StorageService } from 'src/app/services/storage.service';
import { IToken } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>,
    public storage: StorageService,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  loading = false;
  view_pass = false;

  login_form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false],
  });

  ngOnInit(): void {
    this.awaitRemember();
  }

  loginSubmitHandler() {
    if (this.login_form.invalid) return;

    this.loading = true;

    const email: string = this.login_form.value.email as string;
    const password: string = this.login_form.value.password as string;
    const remember: boolean = this.login_form.value.remember as boolean;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.transferDataCart(response, remember);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  awaitRemember() {
    this.login_form.get('remember')?.valueChanges.subscribe((value) => {
      if (!value) return;

      if (!this.storage.cookies) {
        this.openCookieDialog();
      }
    });
  }

  openCookieDialog() {
    const dialogRef = this.dialog.open(CookiesLoginComponent, {
      panelClass: 'cookies-dialog',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.storage.cookies = true;
      } else {
        this.login_form.get('remember')?.setValue(false);
      }
    });
  }

  transferDataCart(response: IToken, remember: boolean) {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        if (cart.length === 0) {
          this.loading = false;
          this.dialogRef.close(true);
        }

        this.storage.setToken(response.access_token, remember);

        cart.forEach((item) => {
          this.cartService.addToCart(item).subscribe({
            next: () => {
              if (cart.indexOf(item) === cart.length - 1) {
                this.loading = false;
                localStorage.removeItem('cart');
                this.dialogRef.close(true);
              }
            },
            error: () => {
              this.loading = false;
              this.dialogRef.close(false);
            },
          });
        });
      },
      error: () => {
        this.dialogRef.close(false);
      },
    });
  }
}
