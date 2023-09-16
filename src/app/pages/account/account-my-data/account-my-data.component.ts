import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { StorageService } from 'src/app/services/storage.service';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-account-my-data',
  templateUrl: './account-my-data.component.html',
  styleUrls: ['./account-my-data.component.scss'],
})
export class AccountMyDataComponent implements OnInit {
  constructor(
    private storage: StorageService,
    private fb: FormBuilder,
    private cValidators: CustomValidatorsService,
    private accountService: AccountService,
    private authService: AuthService
  ) {}

  loading = false;
  submitting = false;

  user = this.storage.myself;
  user_register_percent = 0;
  user_register_text_status = '';

  form = this.fb.group({
    profile_url: [this.user.profile_url],
    name: [this.user.name, Validators.required],
    email: [this.user.email, [Validators.required, Validators.email]],
    cpf: [this.user.cpf, [Validators.required, this.cValidators.cpf()]],
    phone: [this.user.phone, Validators.required],
    birth_date: [this.user.birth_date, Validators.required],
  });

  ngOnInit() {
    this.loading = true;
    this.getResume();
  }

  getResume() {
    this.accountService.getResume().subscribe({
      next: (response) => {
        this.user_register_text_status = response.user_register_text_status;
        this.user = this.storage.myself;
        setTimeout(() => {
          this.user_register_percent = response.user_register_percent;
        }, 1000);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  handleFormSubmit() {
    if (this.submitting) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const body = this.form.value as IUser;

    this.authService.updateMe(body).subscribe({
      next: (response) => {
        this.storage.myself = response;
        this.submitting = false;
        this.storage.changeUser();
        this.getResume();
      },
      error: () => {
        this.submitting = false;
      },
    });
  }

  handleDeleteProfileUrl() {
    this.form.get('profile_url')?.setValue('');
  }

  handleProfileUrlChange(event: string) {
    this.form.get('profile_url')?.setValue(event);
  }
}
