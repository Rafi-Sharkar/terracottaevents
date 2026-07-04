import { CreateBenefitDto, CreatePlanDto } from './dto/plan.dto';
import { PlanService } from './plan.service';
export declare class PlanController {
    private readonly planService;
    constructor(planService: PlanService);
    createPlan(dto: CreatePlanDto): Promise<import("../../common/utils/response.util").TResponse<any>>;
    createBenefit(dto: CreateBenefitDto): Promise<import("../../common/utils/response.util").TResponse<any>>;
    getAllBenefits(): Promise<import("../../common/utils/response.util").TResponse<any>>;
    getAllPlans(): Promise<import("../../common/utils/response.util").TResponse<any>>;
    getPlanById(id: string): Promise<import("../../common/utils/response.util").TResponse<any>>;
    deletePlan(id: string): Promise<import("../../common/utils/response.util").TResponse<any>>;
    deleteBenefit(id: string): Promise<import("../../common/utils/response.util").TResponse<any>>;
    removeBenefitFromPlan(planId: string, benefitId: string): Promise<import("../../common/utils/response.util").TResponse<any>>;
}
