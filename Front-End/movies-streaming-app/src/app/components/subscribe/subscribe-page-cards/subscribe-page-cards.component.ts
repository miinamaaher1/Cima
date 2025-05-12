import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribtionService } from '../../../core/services/subscribtion/subscribtion.service';
import { SubscribtionType } from '../../../core/dtos/SubscriptionType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribe-page-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscribe-page-cards.component.html',
  styleUrl: './subscribe-page-cards.component.css'
})
export class SubscribePageCardsComponent {
  public SubscribtionType = SubscribtionType;

  constructor(
    private subscriptionService: SubscribtionService,
    private router: Router
  ) {}

  onSubscribe(type: SubscribtionType) {
    const domain = window.location.origin;
    this.subscriptionService.subscribe(domain, type).subscribe({
      next: (response) => {
        if (response.paymentUrl) {
          window.open(response.paymentUrl, '_blank');
        }
      },
      error: (error) => {
        console.error('Subscription error:', error);
      }
    });
  }
}
