import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user/user.service';
import { AccountService } from '../../../core/services/Account/account.service';

@Component({
  selector: 'app-nav-account',
  imports: [CommonModule,RouterLink],
  templateUrl: './nav-account.component.html',
  styles: ``
})
export class NavAccountComponent {
  constructor(
    public _userService : UserService,
    private _accountService : AccountService
  ) {}

  isOpen = false;

  @ViewChild('accountDropdown') accountDropdown!: ElementRef;


  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.accountDropdown.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  logout() {
    this._accountService.logout()
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isOpen) {
      this.closeDropdown();
    }
  }
}
