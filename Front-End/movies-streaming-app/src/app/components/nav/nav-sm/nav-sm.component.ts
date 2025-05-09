import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../core/services/Account/account.service';
import { RouterLink } from '@angular/router';
import { IUserSummary } from '../../../core/interfaces/IUser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-sm',
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-sm.component.html',
  styles: ``
})
export class NavSmComponent implements OnInit {
  constructor(
    private _accountService : AccountService
  ) {}

  ngOnInit(): void {
    this._accountService.getUserSummary().subscribe({
      next : res => {
        this.User = res
      },
      error : () => {}
    })
  }

  logout() {
    this._accountService.logout()
  }

  User : IUserSummary | undefined
}
