import { Controller, Get, Delete, Param, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { DevService } from './dev.service';
import { AddTokensDto } from './dto/add-tokens.dto';
import { SubscribeUserDto } from './dto/subscribe-user.dto';

@ApiTags('Dev')
@Controller('dev')
export class DevController {
  constructor(private readonly devService: DevService) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get('users')
  getAllUsers() {
    return this.devService.getAllUsers();
  }

  @ApiOperation({ summary: 'Delete user by ID' })
  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.devService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Add tokens to user account (Dev only)' })
  @ApiBody({ type: AddTokensDto })
  @Post('users/:id/add-tokens')
  addTokens(@Param('id') id: string, @Body() dto: AddTokensDto) {
    return this.devService.addTokens(id, dto.tokens);
  }

  @ApiOperation({
    summary: 'Activate plan subscription and credit tokens to user (Dev only)',
  })
  @ApiBody({ type: SubscribeUserDto })
  @Post('users/:id/subscribe')
  subscribeUser(@Param('id') id: string, @Body() dto: SubscribeUserDto) {
    return this.devService.subscribeUser(id, dto.planId);
  }
}
