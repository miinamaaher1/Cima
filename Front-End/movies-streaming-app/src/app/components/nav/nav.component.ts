import { Component, HostListener } from '@angular/core';
import { NavLinksComponent } from "../nav-links/nav-links.component";
import { NavSearchComponent } from "../nav-search/nav-search.component";
import { NavAccountComponent } from "../nav-account/nav-account.component";

@Component({
  selector: 'app-nav',
  imports: [NavLinksComponent, NavSearchComponent, NavAccountComponent],
  templateUrl: './nav.component.html',
  styles: ``
})
export class NavComponent {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }
}
