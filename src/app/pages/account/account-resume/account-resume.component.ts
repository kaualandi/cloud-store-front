import { IAccountResume } from 'src/app/models/user';
import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-resume',
  templateUrl: './account-resume.component.html',
  styleUrls: ['./account-resume.component.scss'],
})
export class AccountResumeComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  loading = false;
  accountResume = {} as IAccountResume;

  ngOnInit() {
    this.loading = true;
    this.getResume();
  }

  getResume() {
    this.accountService.getResume().subscribe({
      next: (response) => {
        this.accountResume = { ...response, user_register_percent: 0 };
        setTimeout(() => {
          this.accountResume.user_register_percent =
            response.user_register_percent;
        }, 1000);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
