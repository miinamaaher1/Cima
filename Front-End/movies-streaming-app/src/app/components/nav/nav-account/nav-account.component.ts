import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-account',
  imports: [CommonModule,RouterLink],
  templateUrl: './nav-account.component.html',
  styles: ``
})
export class NavAccountComponent {
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

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isOpen) {
      this.closeDropdown();
    }
  }
}
