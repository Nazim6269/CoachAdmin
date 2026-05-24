export interface SubscriptionPlan {
    id:string;
    name:string;
    price:string;
    currency:string;
    interval:string;
    features:string[];
    description:string;
    is_active:number;
    kind:string;
}

export interface CreateSubscriptionPayload {
    name:string;
    price:string;
    currency: string;
    interval:string;
    features:string[];
    description: string;
    is_active:boolean;
    kind:string;
}

export interface UpdateSubscriptionPayload {
    name?: string;
    price?: string;
    features?: string[];
    is_active?: boolean;
    kind?: string;
}