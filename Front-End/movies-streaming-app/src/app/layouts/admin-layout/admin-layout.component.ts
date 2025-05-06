import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavComponent } from "../../components/dashboard/admin-nav/admin-nav.component";

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, AdminNavComponent],
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent {

}
