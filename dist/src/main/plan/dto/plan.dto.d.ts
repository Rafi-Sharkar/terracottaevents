import { BillingCycle } from "../../../../prisma/generated/client";
export declare class CreatePlanDto {
    name: string;
    price: string;
    isMostPopular?: boolean;
    BillingCycle?: BillingCycle;
    benefitIds?: string[];
}
export declare class CreateBenefitDto {
    name: string;
}
