export interface ISubscription {
    subscriptionPlan: string,
    subscriptionType: SubscriptionPlan | null,
}

export enum SubscriptionPlan {
    None,
    VIP,
    BigTime,
    Sports,
    Ultimate
}