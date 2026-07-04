import { TResponse, TPaginatedResponse } from "../../common/utils/response.util";
import { BookingMailService } from "../../lib/mail/services/booking-mail.service";
import { PrismaService } from "../../lib/prisma/prisma.service";
import { BookingStatus } from "../../../prisma/generated/client";
import { CreateBookingDto, SubmitPaymentDto, GetBookingsQueryDto } from './dto/booking.dto';
export declare class BookingService {
    private readonly prisma;
    private readonly bookingMailService;
    constructor(prisma: PrismaService, bookingMailService: BookingMailService);
    private formatBooking;
    createBooking(userId: string, dto: CreateBookingDto): Promise<TResponse<any>>;
    submitPayment(bookingId: string, userId: string, dto: SubmitPaymentDto): Promise<TResponse<any>>;
    approvePayment(bookingId: string): Promise<TResponse<any>>;
    checkIn(bookingId: string): Promise<TResponse<any>>;
    checkOut(bookingId: string): Promise<TResponse<any>>;
    updateBookingStage(bookingId: string, status: BookingStatus): Promise<TResponse<any>>;
    getMyBookings(userId: string, query: GetBookingsQueryDto): Promise<TPaginatedResponse<any>>;
    getAllBookings(query: GetBookingsQueryDto): Promise<TPaginatedResponse<any>>;
    getBookingById(bookingId: string, userId: string, userRole: string): Promise<TResponse<any>>;
    deleteBooking(bookingId: string, userId: string, userRole: string): Promise<TResponse<any>>;
}
