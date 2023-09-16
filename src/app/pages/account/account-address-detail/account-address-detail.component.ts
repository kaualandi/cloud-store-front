import { CONFIG } from './../../../components/modals/confirm/confirm.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from 'src/app/components/modals/confirm/confirm.component';
import { IAddress } from 'src/app/models/user';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-account-address-detail',
  templateUrl: './account-address-detail.component.html',
  styleUrls: ['./account-address-detail.component.scss'],
})
export class AccountAddressDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private storage: StorageService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  loading = false;
  submitting = false;
  deleting = false;

  id = this.route.snapshot.paramMap.get('id');

  form = this.fb.group({
    street: ['', Validators.required],
    number: ['', Validators.required],
    complement: [''],
    zip_code: ['', Validators.required],
    neighborhood: ['', Validators.required],
    city: [{ value: '', disabled: true }, Validators.required],
    state: [{ value: '', disabled: true }, Validators.required],
  });

  ngOnInit(): void {
    if (!this.id) {
      this.router.navigate(['account/my-address']);
      return;
    }

    this.observeZipCodeChanges();
    if (this.id === 'new') return;
    this.loading = true;
    this.getAddress();
  }

  getAddress() {
    return this.addressService.getAddressById(Number(this.id)).subscribe({
      next: (response) => {
        this.form.patchValue(response);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['account/my-address']);
      },
    });
  }

  handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const address = this.form.getRawValue() as IAddress;

    const request =
      this.id !== 'new'
        ? this.addressService.patchAddress(Number(this.id), address)
        : this.addressService.postAddress(address);

    request.subscribe({
      next: () => {
        this.snackbar.success('Endereço salvo com sucesso');
        this.refreshUser();
      },
      error: () => {
        this.submitting = false;
        this.snackbar.error('Erro ao salvar endereço');
      },
    });
  }

  refreshUser() {
    this.storage.changeUser();
    this.authService.me().subscribe({
      next: (user) => {
        this.storage.myself = user;
        this.submitting = false;
        this.router.navigate(['account/my-address']);
      },
      error: () => {
        this.submitting = false;
        this.snackbar.error('Erro ao atualizar usuário');
        this.router.navigate(['account/my-address']);
        window.location.reload();
      },
    });
  }

  handleDeleteAddress() {
    const street = this.form.get('street')?.value;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      ...CONFIG,
      data: {
        title: `Excluir ${street}?`,
        message: 'Essa ação não poderá ser desfeita!',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteAddress();
      }
    });
  }

  deleteAddress() {
    this.deleting = true;
    this.addressService.deleteAddress(Number(this.id)).subscribe({
      next: () => {
        this.snackbar.success('Endereço excluído com sucesso');
        this.refreshUser();
      },
      error: () => {
        this.deleting = false;
        this.snackbar.error('Erro ao excluir endereço');
      },
    });
  }

  observeZipCodeChanges() {
    this.form.get('zip_code')?.valueChanges.subscribe((zipCode) => {
      if (!zipCode || zipCode.length < 8) return;

      this.addressService.getAddressByZipCode(zipCode).subscribe({
        next: (address) => {
          if (address.erro) {
            this.form.get('zip_code')?.setErrors({ invalid: true });
            this.snackbar.error('CEP inválido');
            return;
          }
          this.form.patchValue({
            state: address.uf,
            city: address.localidade,
            neighborhood: address.bairro,
            street: address.logradouro,
            complement:
              address.complemento || this.form.get('complement')?.value,
          });
        },
      });
    });
  }
}
