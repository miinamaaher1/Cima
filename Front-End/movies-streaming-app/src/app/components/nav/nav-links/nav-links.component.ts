import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-nav-links',
  standalone: true,
  imports: [RouterModule,RouterLink,RouterLinkActive, CommonModule],
  templateUrl: './nav-links.component.html',
  styles: ``
})
export class NavLinksComponent {
  constructor (public _userService : UserService) {}
}
