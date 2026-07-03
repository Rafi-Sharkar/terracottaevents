import { successResponse, TResponse } from '@/common/utils/response.util';
import { AppError } from '@/core/error/handle-error.app';
import { HandleError } from '@/core/error/handle-error.decorator';
import { PrismaService } from '@/lib/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateBenefitDto, CreatePlanDto } from './dto/plan.dto';

@Injectable()
export class PlanService {
  constructor(private readonly prisma: PrismaService) {}

  @HandleError('Failed to create plan')
  async createPlan(dto: CreatePlanDto): Promise<TResponse<any>> {
    const { name, price, isMostPopular, BillingCycle, benefitIds } = dto;

    // Check if plan name already exists
    const existingPlan = await this.prisma.client.plan.findUnique({
      where: { name },
    });
    if (existingPlan) {
      throw new AppError(400, 'Plan with this name already exists');
    }

    // Create plan
    const newPlan = await this.prisma.client.plan.create({
      data: {
        name,
        price,
        isMostPopular: isMostPopular ?? false,
        BillingCycle: BillingCycle ?? 'ONE_TIME',
      },
    });

    // Handle benefits associations if any
    if (benefitIds && benefitIds.length > 0) {
      const planBenefitsData = benefitIds.map((benefitId) => ({
        planId: newPlan.id,
        BenefitsId: benefitId,
      }));

      await this.prisma.client.planBenefits.createMany({
        data: planBenefitsData,
      });
    }

    const planWithBenefits = await this.prisma.client.plan.findUnique({
      where: { id: newPlan.id },
      include: {
        Benefitss: {
          include: {
            Benefits: true,
          },
        },
      },
    });

    return successResponse(planWithBenefits, 'Plan created successfully');
  }

  @HandleError('Failed to create benefit')
  async createBenefit(dto: CreateBenefitDto): Promise<TResponse<any>> {
    const { name } = dto;

    const existingBenefit = await this.prisma.client.benefits.findUnique({
      where: { name },
    });
    if (existingBenefit) {
      throw new AppError(400, 'Benefit with this name already exists');
    }

    const newBenefit = await this.prisma.client.benefits.create({
      data: { name },
    });

    return successResponse(newBenefit, 'Benefit created successfully');
  }

  @HandleError('Failed to fetch plans')
  async getAllPlans(): Promise<TResponse<any>> {
    const plans = await this.prisma.client.plan.findMany({
      include: {
        Benefitss: {
          include: {
            Benefits: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(plans, 'Plans retrieved successfully');
  }

  @HandleError('Failed to fetch plan')
  async getPlanById(id: string): Promise<TResponse<any>> {
    const plan = await this.prisma.client.plan.findUnique({
      where: { id },
      include: {
        Benefitss: {
          include: {
            Benefits: true,
          },
        },
      },
    });

    if (!plan) {
      throw new AppError(404, 'Plan not found');
    }

    return successResponse(plan, 'Plan retrieved successfully');
  }

  @HandleError('Failed to fetch benefits')
  async getAllBenefits(): Promise<TResponse<any>> {
    const benefits = await this.prisma.client.benefits.findMany({
      orderBy: { name: 'asc' },
    });

    return successResponse(benefits, 'Benefits retrieved successfully');
  }

  @HandleError('Failed to delete plan')
  async deletePlan(planId: string): Promise<TResponse<any>> {
    const plan = await this.prisma.client.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      throw new AppError(404, 'Plan not found');
    }

    await this.prisma.client.booking.deleteMany({
      where: { planId },
    });

    await this.prisma.client.planBenefits.deleteMany({
      where: { planId },
    });

    const deletedPlan = await this.prisma.client.plan.delete({
      where: { id: planId },
    });

    return successResponse(deletedPlan, 'Plan and all related bookings deleted successfully');
  }

  @HandleError('Failed to delete benefit')
  async deleteBenefit(benefitId: string): Promise<TResponse<any>> {
    const benefit = await this.prisma.client.benefits.findUnique({
      where: { id: benefitId },
    });

    if (!benefit) {
      throw new AppError(404, 'Benefit not found');
    }

    await this.prisma.client.planBenefits.deleteMany({
      where: { BenefitsId: benefitId },
    });

    const deletedBenefit = await this.prisma.client.benefits.delete({
      where: { id: benefitId },
    });

    return successResponse(deletedBenefit, 'Benefit and its relations deleted successfully');
  }

  @HandleError('Failed to remove benefit from plan')
  async removeBenefitFromPlan(
    planId: string,
    benefitId: string,
  ): Promise<TResponse<any>> {
    const relation = await this.prisma.client.planBenefits.findUnique({
      where: {
        planId_BenefitsId: { planId, BenefitsId: benefitId },
      },
    });

    if (!relation) {
      throw new AppError(404, 'Benefit not associated with this plan');
    }

    const removedRelation = await this.prisma.client.planBenefits.delete({
      where: {
        planId_BenefitsId: { planId, BenefitsId: benefitId },
      },
    });

    return successResponse(removedRelation, 'Benefit removed from plan successfully');
  }
}
