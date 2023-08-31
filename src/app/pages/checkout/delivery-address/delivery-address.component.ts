import { AddressService } from './../../../services/address.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IAddress } from 'src/app/models/user';
import { OrderService } from 'src/app/services/order.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss'],
})
export class DeliveryAddressComponent implements OnInit {
  constructor(
    private storage: StorageService,
    private fb: FormBuilder,
    private addressService: AddressService,
    private snackbar: SnackbarService,
    private orderService: OrderService
  ) {}

  loading = false;
  addAddress = false;
  edditingAddress = false;
  order = this.orderService.getNewOrder();
  user = this.storage.myself;
  selectedAddress = new FormControl(0);

  newAddressForm = this.fb.group({
    zip_code: ['', Validators.required],
    state: [
      { value: '', disabled: true },
      [Validators.required, Validators.maxLength(2)],
    ],
    city: [{ value: '', disabled: true }, Validators.required],
    neighborhood: ['', Validators.required],
    street: ['', Validators.required],
    number: ['', [Validators.required, Validators.min(1)]],
    complement: [''],
  });

  ngOnInit(): void {
    this.observeZipCodeChanges();

    this.selectedAddress.valueChanges.subscribe((value) => {
      if (!value) return;
      this.order.address_id = value;
      this.order.address = this.user.address?.find(
        (address) => address.id === value
      ) as IAddress;
      this.orderService.changeOrder();
    });

    if (!this.user.id) {
      const userInterval = setInterval(() => {
        if (this.storage.myself.id) {
          this.user = this.storage.myself;
          clearInterval(userInterval);
        }
      });
    }
  }

  handleFormSubmit() {
    if (this.loading) return;
    if (this.newAddressForm.invalid) {
      this.newAddressForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formAddress = this.newAddressForm.getRawValue();
    const address = {
      zip_code: formAddress.zip_code || '',
      state: formAddress.state || '',
      city: formAddress.city || '',
      neighborhood: formAddress.neighborhood || '',
      street: formAddress.street || '',
      number: formAddress.number || '',
      complement: formAddress.complement || '',
    } as IAddress;

    if (this.edditingAddress) {
      if (!this.selectedAddress.value) return;
      this.patchAddress(this.selectedAddress.value, address);
      return;
    }

    this.postAddress(address);
  }

  setAddAddress() {
    this.addAddress = true;
    this.edditingAddress = false;
  }

  setEdittingAddress(id: number) {
    this.selectedAddress.setValue(id);
    this.addAddress = false;
    this.edditingAddress = true;
    const address = this.user.address?.find((address) => address.id === id);
    if (!address) return;
    this.newAddressForm.patchValue(address);
  }

  postAddress(address: IAddress) {
    this.addressService.postAddress(address).subscribe({
      next: (address) => {
        this.user.address?.push(address);
        this.storage.changeUser();
        this.snackbar.success('Endereço cadastrado com sucesso');
        this.handleAddAddressCancel();
        this.selectedAddress.setValue(address.id);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  patchAddress(id: number, address: IAddress) {
    this.addressService.patchAddress(id, address).subscribe({
      next: (address) => {
        const oldAddress = this.user.address?.find(
          (address) => address.id === id
        );
        if (oldAddress) {
          Object.assign(oldAddress, address);
        }
        this.storage.changeUser();
        this.snackbar.success('Endereço editado com sucesso');
        this.handleAddAddressCancel();
        this.selectedAddress.setValue((this.user.address?.length || 1) - 1);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  handleAddAddressCancel() {
    this.addAddress = false;
    this.edditingAddress = false;
    this.newAddressForm.reset();
  }

  observeZipCodeChanges() {
    this.newAddressForm.get('zip_code')?.valueChanges.subscribe((zipCode) => {
      if (!zipCode || zipCode.length < 8) return;

      this.addressService.getAddressByZipCode(zipCode).subscribe({
        next: (address) => {
          if (address.erro) {
            this.newAddressForm.get('zip_code')?.setErrors({ invalid: true });
            this.snackbar.error('CEP inválido');
            return;
          }
          this.newAddressForm.patchValue({
            state: address.uf,
            city: address.localidade,
            neighborhood: address.bairro,
            street: address.logradouro,
            complement: address.complemento,
          });
        },
      });
    });
  }
}
