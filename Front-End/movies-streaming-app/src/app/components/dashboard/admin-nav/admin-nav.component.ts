import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  imports: [RouterModule,RouterLink,RouterLinkActive],
  templateUrl: './admin-nav.component.html'
})
export class AdminNavComponent {

}
