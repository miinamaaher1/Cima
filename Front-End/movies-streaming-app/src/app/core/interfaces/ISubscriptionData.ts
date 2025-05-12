export interface ISubscription {
    subscriptionState: boolean,
    subscriptionPlan: SubscriptionPlan,
}

export enum SubscriptionPlan {
    None,
    VIP,
    BigTime,
    Sports,
    Ultimate
}