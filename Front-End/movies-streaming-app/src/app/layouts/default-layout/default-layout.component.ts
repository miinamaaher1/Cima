import { Component } from '@angular/core';
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../components/nav/nav.component';

@Component({
  selector: 'app-default-layout',
  imports: [NavComponent, FooterComponent,RouterOutlet],
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {

}
