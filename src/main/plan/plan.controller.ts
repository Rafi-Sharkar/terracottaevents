import { ValidateSuperAdmin } from '@/core/jwt/jwt.decorator';
import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBenefitDto, CreatePlanDto } from './dto/plan.dto';
import { PlanService } from './plan.service';

@ApiTags('Plans & Benefits')
@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @ApiOperation({ summary: 'Create a new plan (Super Admin only)' })
  @ApiBearerAuth()
  @Post()
  @ValidateSuperAdmin()
  async createPlan(@Body() dto: CreatePlanDto) {
    return this.planService.createPlan(dto);
  }

  @ApiOperation({ summary: 'Create a new benefit (Super Admin only)' })
  @ApiBearerAuth()
  @Post('benefits')
  @ValidateSuperAdmin()
  async createBenefit(@Body() dto: CreateBenefitDto) {
    return this.planService.createBenefit(dto);
  }

  @ApiOperation({ summary: 'Get all benefits' })
  @Get('benefits')
  async getAllBenefits() {
    return this.planService.getAllBenefits();
  }

  @ApiOperation({ summary: 'Get all plans with their associated benefits' })
  @Get()
  async getAllPlans() {
    return this.planService.getAllPlans();
  }

  @ApiOperation({ summary: 'Get plan details by ID' })
  @Get(':id')
  async getPlanById(@Param('id') id: string) {
    return this.planService.getPlanById(id);
  }

  @ApiOperation({ summary: 'Delete a plan (Super Admin only)' })
  @ApiBearerAuth()
  @Delete(':id')
  @ValidateSuperAdmin()
  async deletePlan(@Param('id') id: string) {
    return this.planService.deletePlan(id);
  }

  @ApiOperation({ summary: 'Delete a benefit (Super Admin only)' })
  @ApiBearerAuth()
  @Delete('benefits/:id')
  @ValidateSuperAdmin()
  async deleteBenefit(@Param('id') id: string) {
    return this.planService.deleteBenefit(id);
  }

  @ApiOperation({ summary: 'Remove a benefit from a plan (Super Admin only)' })
  @ApiBearerAuth()
  @Delete(':planId/benefits/:benefitId')
  @ValidateSuperAdmin()
  async removeBenefitFromPlan(
    @Param('planId') planId: string,
    @Param('benefitId') benefitId: string,
  ) {
    return this.planService.removeBenefitFromPlan(planId, benefitId);
  }
}
