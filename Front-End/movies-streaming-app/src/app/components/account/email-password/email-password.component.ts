import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-email-password',
  imports: [RouterLink],
  templateUrl: './email-password.component.html'
})
export class EmailPasswordComponent {
  @Input() email: string = "test@test.com";
  sendMail() {
  }
}
