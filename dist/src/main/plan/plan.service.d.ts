import { TResponse } from "../../common/utils/response.util";
import { PrismaService } from "../../lib/prisma/prisma.service";
import { CreateBenefitDto, CreatePlanDto } from './dto/plan.dto';
export declare class PlanService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createPlan(dto: CreatePlanDto): Promise<TResponse<any>>;
    createBenefit(dto: CreateBenefitDto): Promise<TResponse<any>>;
    getAllPlans(): Promise<TResponse<any>>;
    getPlanById(id: string): Promise<TResponse<any>>;
    getAllBenefits(): Promise<TResponse<any>>;
    deletePlan(planId: string): Promise<TResponse<any>>;
    deleteBenefit(benefitId: string): Promise<TResponse<any>>;
    removeBenefitFromPlan(planId: string, benefitId: string): Promise<TResponse<any>>;
}
