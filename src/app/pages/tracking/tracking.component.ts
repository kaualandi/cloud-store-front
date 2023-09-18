import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent {
  constructor(private fb: FormBuilder) {}

  search = true;
  loading = false;
  success = false;

  search_error = false;

  byOrderNumberForm = this.fb.group({
    email_phone: ['', Validators.required],
    order_number: ['', Validators.required],
  });

  byTrackingNumberForm = this.fb.group({
    tracking_number: ['', Validators.required],
  });

  tracking_steps = [
    {
      title: 'Em transito',
      description: 'De Rio de Janeiro - RJ para Teresópolis - RJ',
    },
    {
      title: 'Em transito',
      description: 'De São Paulo - SP para Rio de Janeiro - RJ',
    },
  ];

  searchFn() {
    this.search = false;
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.success = true;
    }, 2000);
  }

  handleByOrderNumberFormSubmit() {
    if (this.byOrderNumberForm.invalid) {
      this.byOrderNumberForm.markAllAsTouched();
      return;
    }

    this.searchFn();
  }

  handleByTrackingNumberFormSubmit() {
    if (this.byTrackingNumberForm.invalid) {
      this.byTrackingNumberForm.markAllAsTouched();
      return;
    }

    this.searchFn();
  }

  reset() {
    this.search = true;
    this.loading = false;
    this.success = false;
    this.search_error = false;

    const allFormControls = [
      ...Object.values(this.byOrderNumberForm.controls),
      ...Object.values(this.byTrackingNumberForm.controls),
    ];

    setTimeout(() => {
      allFormControls.forEach((control) => {
        const value = control.value;
        if (!value) {
          control.markAsUntouched();
          return;
        }
        const length = value.length;
        let i = 0;
        const interval = setInterval(() => {
          control.setValue(value.slice(0, length - i));
          i++;
          if (i > length) {
            clearInterval(interval);
            control.markAsUntouched();
          }
        }, 30);
      });
    }, 500);
  }
}
