import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbar.service';

import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnBrPackage from '@zxcvbn-ts/language-pt-br';

@Component({
  selector: 'app-account-password',
  templateUrl: './account-password.component.html',
  styleUrls: ['./account-password.component.scss'],
})
export class AccountPasswordComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackbar: SnackbarService
  ) {}

  loading = false;

  view_pass_c = false;
  view_pass_n = false;
  view_pass_r = false;

  password_warning = '';
  password_suggestions: string[] = [];
  score: 0 | 1 | 2 | 3 | 4 = 0;

  scores = {
    0: 'Muito fraca',
    1: 'Fraca',
    2: 'Razoável',
    3: 'Boa',
    4: 'Forte',
  };

  form = this.fb.group({
    current_password: ['', Validators.required],
    new_password: ['', Validators.required],
    repeat_password: ['', Validators.required],
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.confirmPassValidate();

      if (value.new_password) this.strengthPassword(value.new_password);
    });
  }

  handleFormSubmit() {
    if (!this.confirmPassValidate() || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const { current_password, new_password } = this.form.value;

    this.authService
      .changePassword(current_password || '', new_password || '')
      .subscribe({
        next: () => {
          this.loading = false;
          this.form.reset();
          this.snackbar.success('Senha alterada com sucesso!');
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  confirmPassValidate() {
    const { new_password, repeat_password } = this.form.value;
    if (!repeat_password) return true;

    const valid = new_password === repeat_password;
    if (valid) this.form.controls.repeat_password.setErrors(null);
    if (!valid) this.form.controls.repeat_password.setErrors({ notSame: true });
    return valid;
  }

  strengthPassword(password: string) {
    const options = {
      translations: zxcvbnBrPackage.translations,
      graphs: zxcvbnCommonPackage.adjacencyGraphs,
      dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnBrPackage.dictionary,
      },
    };
    zxcvbnOptions.setOptions(options);
    const passwordStatus = zxcvbn(password);
    this.password_warning = passwordStatus.feedback.warning || '';
    this.password_suggestions = passwordStatus.feedback.suggestions;
    this.score = passwordStatus.score;
  }
}
