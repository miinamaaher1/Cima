import { Component, HostListener } from '@angular/core';
import { NavLinksComponent } from "../nav-links/nav-links.component";
import { NavSearchComponent } from "../nav-search/nav-search.component";
import { NavAccountComponent } from "../nav-account/nav-account.component";
import { NavSmComponent } from "../nav-sm/nav-sm.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [NavLinksComponent,
            NavSearchComponent,
            NavAccountComponent,
            NavSmComponent, 
            CommonModule],
  templateUrl: './nav.component.html',
  styles: ``
})
export class NavComponent {
  isScrolled = false;
  isSmallView = false;
  isSmallScreenOpen = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkViewport();
    if (!this.isSmallView) {
      this.isSmallScreenOpen = false;
    }
  }

  ngOnInit() {
    this.checkViewport();
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
