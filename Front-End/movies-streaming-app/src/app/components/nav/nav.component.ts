import { Component, HostListener, Inject, OnChanges, OnInit, PLATFORM_ID, signal, SimpleChanges } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavLinksComponent } from './nav-links/nav-links.component';
import { NavSearchComponent } from './nav-search/nav-search.component';
import { NavAccountComponent } from './nav-account/nav-account.component';
import { NavSmComponent } from './nav-sm/nav-sm.component';
import { AccountService } from '../../core/services/Account/account.service';
import { IUserSummary } from '../../core/interfaces/IUser';

@Component({
  selector: 'app-nav',
  imports: [NavLinksComponent,
            NavSearchComponent,
            NavAccountComponent,
            NavSmComponent,
            CommonModule,
            RouterLink,
            ],
  templateUrl: './nav.component.html',
  styles: ``
})
export class NavComponent implements OnInit, OnChanges {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _accountService : AccountService
  ) {}

  isScrolled = false;
  isSmallView = false;
  isSmallScreenOpen = false;

  User = signal<IUserSummary | null>(null)

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
    this.checkViewport();
  }
    if (!this.isSmallView) {
      this.isSmallScreenOpen = false;
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkViewport();
    }
    this._accountService.getUserSummary().subscribe({
      next : res => {
        this.User.set(res)
      },
      error : () => {}
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._accountService.getUserSummary().subscribe({
      next : res => {
        this.User.set(res)
      },
      error : () => {}
    })
  }

  checkViewport() {
    this.isSmallView = window.innerWidth < 1024;
  }

  toggleSmallScreen() {
    this.isSmallScreenOpen = !this.isSmallScreenOpen;
    document.body.style.overflow = this.isSmallScreenOpen ? 'hidden' : '';
  }

  closeSmallScreen() {
    this.isSmallScreenOpen = false;
    document.body.style.overflow = '';
  }
}
