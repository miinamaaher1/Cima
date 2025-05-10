import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../../../core/services/Account/account.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user/user.service';



@Component({
  selector: 'app-nav-sm',
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-sm.component.html',
  styles: ``
})
export class NavSmComponent {
  constructor(
    private _accountService : AccountService,
    public _userService : UserService
  ) {}

  @Output() Mina=new EventEmitter()
  Close(){
    this.Mina.emit()
  }

  logout() {
    this._accountService.logout()
  }
}
