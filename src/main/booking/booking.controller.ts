import {
  GetUser,
  ValidateAuth,
  ValidateSuperAdmin,
  ValidateUser,
} from '@/core/jwt/jwt.decorator';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingStatusDto, SubmitPaymentDto, GetBookingsQueryDto } from './dto/booking.dto';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: 'Book a plan (User only)' })
  @ApiBearerAuth()
  @Post()
  @ValidateUser()
  async createBooking(
    @GetUser('sub') userId: string,
    @Body() dto: CreateBookingDto,
  ) {
    return this.bookingService.createBooking(userId, dto);
  }

  @ApiOperation({ summary: 'Get all bookings (Super Admin only)' })
  @ApiBearerAuth()
  @Get()
  @ValidateSuperAdmin()
  async getAllBookings(@Query() query: GetBookingsQueryDto) {
    return this.bookingService.getAllBookings(query);
  }

  @ApiOperation({ summary: 'Get current user\'s bookings (User only)' })
  @ApiBearerAuth()
  @Get('my')
  @ValidateUser()
  async getMyBookings(
    @GetUser('sub') userId: string,
    @Query() query: GetBookingsQueryDto,
  ) {
    return this.bookingService.getMyBookings(userId, query);
  }

  @ApiOperation({ summary: 'Get a specific booking by ID' })
  @ApiBearerAuth()
  @Get(':id')
  @ValidateAuth()
  async getBookingById(
    @Param('id') bookingId: string,
    @GetUser('sub') userId: string,
    @GetUser('role') userRole: string,
  ) {
    return this.bookingService.getBookingById(bookingId, userId, userRole);
  }

  @ApiOperation({ summary: 'Submit payment transaction ID (User only)' })
  @ApiBearerAuth()
  @Patch(':id/payment')
  @ValidateUser()
  async submitPayment(
    @Param('id') bookingId: string,
    @GetUser('sub') userId: string,
    @Body() dto: SubmitPaymentDto,
  ) {
    return this.bookingService.submitPayment(bookingId, userId, dto);
  }

  @ApiOperation({ summary: 'Approve booking payment (Super Admin only)' })
  @ApiBearerAuth()
  @Patch(':id/approve')
  @ValidateSuperAdmin()
  async approvePayment(
    @Param('id') bookingId: string,
  ) {
    return this.bookingService.approvePayment(bookingId);
  }

  @ApiOperation({ summary: 'Complete check-in for a booking (Super Admin only)' })
  @ApiBearerAuth()
  @Patch(':id/check-in')
  @ValidateSuperAdmin()
  async checkIn(
    @Param('id') bookingId: string,
  ) {
    return this.bookingService.checkIn(bookingId);
  }

  @ApiOperation({ summary: 'Complete check-out for a booking (Super Admin only)' })
  @ApiBearerAuth()
  @Patch(':id/check-out')
  @ValidateSuperAdmin()
  async checkOut(
    @Param('id') bookingId: string,
  ) {
    return this.bookingService.checkOut(bookingId);
  }

  @ApiOperation({ summary: 'Update booking stage / status (Super Admin only)' })
  @ApiBearerAuth()
  @Patch(':id/stage')
  @ValidateSuperAdmin()
  async updateBookingStage(
    @Param('id') bookingId: string,
    @Body() dto: UpdateBookingStatusDto,
  ) {
    return this.bookingService.updateBookingStage(bookingId, dto.status);
  }

  @ApiOperation({ summary: 'Delete a booking (User/Admin)' })
  @ApiBearerAuth()
  @Delete(':id')
  @ValidateAuth()
  async deleteBooking(
    @Param('id') bookingId: string,
    @GetUser('sub') userId: string,
    @GetUser('role') userRole: string,
  ) {
    return this.bookingService.deleteBooking(bookingId, userId, userRole);
  }
}

