import { Component } from '@angular/core';
import { NavComponent } from "../../components/nav-section/nav/nav.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  imports: [NavComponent, FooterComponent,RouterOutlet],
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {

}
