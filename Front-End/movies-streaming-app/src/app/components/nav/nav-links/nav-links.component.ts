import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AccountService } from '../../../core/services/Account/account.service';
import { IUserSummary } from '../../../core/interfaces/IUser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-links',
  standalone: true,
  imports: [RouterModule,RouterLink,RouterLinkActive, CommonModule],
  templateUrl: './nav-links.component.html',
  styles: ``
})
export class NavLinksComponent implements OnInit {
  constructor (private _accountService : AccountService) {}

  ngOnInit(): void {
      this._accountService.getUserSummary().subscribe({
        next : res => {
          this.User = res
        },
        error : () => {}
      })
    }


    User : IUserSummary | undefined

}
