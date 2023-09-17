import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IConfig } from 'src/app/models/config';
import { IContact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private contactService: ContactService,
    private snackbar: SnackbarService
  ) {}

  loading = false;
  submitting = false;

  config = this.storage.config;
  wpp = `https://wa.me/55${this.config.whatsapp}`;
  phone = `tel:+55 ${this.config.whatsapp}`;
  mail = `mailto:${this.config.email}`;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    phone: ['', Validators.required],
    contact_back: ['CALL', Validators.required],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  ngOnInit(): void {
    this.form.patchValue(this.storage.myself);
  }

  handleFormSubmit() {
    if (this.submitting) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const contact = this.form.value as IContact;

    this.contactService.post(contact).subscribe({
      next: () => {
        this.form.reset();
        this.submitting = false;
        this.snackbar.success('Mensagem enviada com sucesso!');
      },
      error: () => {
        this.submitting = false;
      },
    });
  }
}
