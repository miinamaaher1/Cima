import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnChanges, OnInit, signal, SimpleChanges, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../../core/services/Account/account.service';
import { IUserSummary } from '../../../core/interfaces/IUser';

@Component({
  selector: 'app-nav-account',
  imports: [CommonModule,RouterLink],
  templateUrl: './nav-account.component.html',
  styles: ``
})
export class NavAccountComponent implements OnInit, OnChanges {
  constructor(
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

  User = signal<IUserSummary | null>(null)

  AccountName = signal<string>("My Account")

  ngOnInit(): void {
    this._accountService.getUserSummary().subscribe({
      next : res => {
        this.User.set(res)
        if (this.User() != null) {
          this.AccountName.set(res.userInfo?.firstName + " " + res.userInfo?.lastName)
        } else {
          this.AccountName.set("My Account")
        }
      },
      error : () => {}
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._accountService.getUserSummary().subscribe({
      next : res => {
        this.User.set(res)
        if (this.User() != null) {
          this.AccountName.set(res.userInfo?.firstName + " " + res.userInfo?.lastName)
        } else {
          this.AccountName.set("My Account")
        }
      },
      error : () => {}
    })
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
