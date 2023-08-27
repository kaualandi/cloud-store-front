import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private storage: StorageService,
    private fb: FormBuilder,
    private cValidators: CustomValidatorsService
  ) {}

  completed = false;
  editing = false;
  loading = false;
  user = this.storage.myself;
  userForm = this.fb.group({
    email: [this.user.email, [Validators.required, Validators.email]],
    name: [this.user.name, [Validators.required]],
    cpf: [this.user.cpf, [Validators.required, this.cValidators.cpf()]],
    phone: [this.user.phone, [Validators.required]],
  });

  ngOnInit(): void {
    if (!this.user.id) {
      const userInterval = setInterval(() => {
        if (this.storage.myself.id) {
          this.user = this.storage.myself;
          this.userForm.patchValue(this.user);
          this.checkUserData();
          clearInterval(userInterval);
        }
      });
    }
  }

  handleEditClick() {
    if (this.loading) return;

    if (this.editing) {
      this.handleFormSubmit();
      return;
    }

    this.editing = true;
    this.userForm.enable();
  }

  handleFormSubmit() {
    if (this.loading) return;
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.user = {
      ...this.user,
      name: this.userForm.value.name as string,
      email: this.userForm.value.email as string,
      cpf: this.userForm.value.cpf as string,
      phone: this.userForm.value.phone as string,
    };

    this.authService.updateMe(this.user).subscribe({
      next: (user) => {
        this.user = user;
        this.storage.changeUser();
        this.checkUserData();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  checkUserData() {
    const { email, name, cpf, phone } = this.user;

    if (!email || !name || !cpf || !phone) {
      this.editing = true;
      return;
    }

    this.editing = false;
    this.completed = true;
    this.userForm.disable();
  }

  logout() {
    this.storage.logout();
  }
}
