import { BookingStatus, PaymentMethod } from "../../../../prisma/generated/client";
import { PaginationDto } from "../../../common/dto/pagination.dto";
export declare class CreateBookingDto {
    planId: string;
    paymentMethod: PaymentMethod;
    discount?: number;
}
export declare class SubmitPaymentDto {
    transactionId: string;
}
export declare class UpdateBookingStatusDto {
    status: BookingStatus;
}
export declare class GetBookingsQueryDto extends PaginationDto {
    status?: BookingStatus;
}
