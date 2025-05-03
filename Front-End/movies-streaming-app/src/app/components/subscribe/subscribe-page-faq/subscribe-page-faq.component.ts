import { Component } from '@angular/core';

export interface IFAQ {
  question: string,
  answers: string[]
}


@Component({
  selector: 'app-subscribe-page-faq',
  imports: [],
  templateUrl: './subscribe-page-faq.component.html',
  styleUrl: './subscribe-page-faq.component.css'
})
export class SubscribePageFAQComponent {
  frequentlyAskedQuestions: IFAQ[] = [
    {
      question: "what is cima?",
      answers: [
        "Cima is the number 1 global entertainment platform for Arabs in the Middle East & North Africa (MENA) and worldwide.",
        "As the first video-on-demand (VOD) service in the Arab world, powered by the MBC Group, Cima offers the largest Arabic library of content in the world as well as Western, Turkish, Korean and Bollywood titles. This includes award-winning Cima Originals, exclusive premieres, movies fresh off the box-office, documentaries and live TV channels in Full HD.",
        "In addition, viewers can live stream or replay their favorite sports content and events from the Saudi Pro League, and Formula 1 to name a few, as well as watch concerts as they happen direct from Riyadh Season and more. Cima also has a whole range of safe, engaging, educational and culturally-aware content for kids.",
        "Cima’s mission is to find and create stories that move Arabs, society and the world. Our goal is to push, elevate and promote Arabic entertainment on the global stage while supporting local and regional talent in telling their own stories on our platform. Cima content is available through the Cima application on mobile devices, smart TVs and on Cima.net.",
        "Viewers can enjoy watching a great selection of content on Cima without subscription, or they can subscribe to one of the packages and unlock a whole world of premium entertainment and sports."
      ]
    },
    {
      question: "How can I subscribe to any of the available packages?",
      answers: [
        "In just a few simple steps you can join our world and enjoy Cima Originals, exclusive series and movie premieres, live TV, sports from around the world and live entertainment.",
        "You can subscribe to Cima packages by visiting Cima.net or downloading the Cima app. Click here to view available packages and add-ons.",
        "Here are the simple steps you can follow to subscribe to your preferred package:",
          `
            - Select any of the available packages
            - You can also add more content to your package to get access to your favorite content
            - Select your prefered plan and method of payment
            - Create an account or login using your email or mobile number
            - Enter your payment details and subscribe
        `,
      ]
    },
    {
      question: "How can I add Sports or BigTime to my package?",
      answers: [
        "If you're an existing VIP subscriber, you can add Sport, BigTime or GOBX* to your package. Simply visit your subscription management and click on the banner shown 'Available add-ons'",
        `
          If you're a new user, you can subscribe to any of the following packages that give you access to your favorite content
          VIP - you can add BigTime to watch concerts and live events
          VIP | Sports - you can add GOBX* to watch sports content on your GOBX device
          Ultimate - you can also add GOBX* to watch sports content on your GOBX device
          `,
        "*GOBX add-on is only available in KSA"
      ]
    },
    {
      question: "How many devices are allowed based on my subscription?",
      answers: [
        "With Cima, you can access your account on up to 20 devices regardless of your subscription type. You can watch on 3 devices at the same time from the same location."
      ]
    },
    {
      question: "How many profiles can I create?",
      answers: [
        "On Cima, you can have up to 5 profiles. Every account has 2 default profiles, an adult profile and a kids profile. 3 additional profiles can be added (adult or kids)",
        "Your family and friends can now enjoy their own personalized Cima experience through your account and each profile will get their own:",
        `
          - My list
          - Preferred language
          - Personalized watching experience
          - Unique content suggestions
          - Safe content (Kids)
        `
      ]
    },
    {
      question: "Can I cancel my subscription anytime?​",
      answers: [
        "Yes! There are no contracts or commitments, you can cancel your subscription at anytime with no exit charges.",
        "For payment options by phone and credit cards:",
        `
          1- Go to the account settings (using the adult profile page)
          2- Click on Subscription Management
          3- Click on "Cancel subscription"
        `,
        "If your subscription is via iTunes or Google play, simply visit your store's subscription management to cancel",
        "You will continue to have access until the end of the current subscription period."
      ]
    }
  ]
}
