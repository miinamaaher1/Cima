import { Component } from '@angular/core';
import { SubscribePageHeaderComponent } from '../subscribe-page-header/subscribe-page-header.component';
import { SubscribePageCardsComponent } from "../subscribe-page-cards/subscribe-page-cards.component";
import { SubscribePageFAQComponent } from "../subscribe-page-faq/subscribe-page-faq.component";
import { FooterComponent } from "../../shared/footer/footer.component";



@Component({
  selector: 'app-subscribe-page',
  imports: [SubscribePageHeaderComponent, SubscribePageCardsComponent, SubscribePageFAQComponent, FooterComponent],
  templateUrl: './subscribe-page.component.html',
  styleUrl: './subscribe-page.component.css'
})
export class SubscribePageComponent {


}
