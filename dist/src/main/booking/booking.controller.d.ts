import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingStatusDto, SubmitPaymentDto, GetBookingsQueryDto } from './dto/booking.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    createBooking(userId: string, dto: CreateBookingDto): Promise<import("../../common/utils/response.util").TResponse<any>>;
    getAllBookings(query: GetBookingsQueryDto): Promise<import("../../common/utils/response.util").TPaginatedResponse<any>>;
    getMyBookings(userId: string, query: GetBookingsQueryDto): Promise<import("../../common/utils/response.util").TPaginatedResponse<any>>;
    getBookingById(bookingId: string, userId: string, userRole: string): Promise<import("../../common/utils/response.util").TResponse<any>>;
    submitPayment(bookingId: string, userId: string, dto: SubmitPaymentDto): Promise<import("../../common/utils/response.util").TResponse<any>>;
    approvePayment(bookingId: string): Promise<import("../../common/utils/response.util").TResponse<any>>;
    checkIn(bookingId: string): Promise<import("../../common/utils/response.util").TResponse<any>>;
    checkOut(bookingId: string): Promise<import("../../common/utils/response.util").TResponse<any>>;
    updateBookingStage(bookingId: string, dto: UpdateBookingStatusDto): Promise<import("../../common/utils/response.util").TResponse<any>>;
    deleteBooking(bookingId: string, userId: string, userRole: string): Promise<import("../../common/utils/response.util").TResponse<any>>;
}
