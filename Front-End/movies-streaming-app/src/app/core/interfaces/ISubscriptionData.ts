export interface ISubscription {
    subscriptionState: boolean,
    subscriptionType: SubscriptionPlan,
}

export enum SubscriptionPlan {
    None,
    VIP,
    BigTime,
    Sports,
    Ultimate
}