import { MailService } from '../mail.service';
export declare class BookingMailService {
    private readonly mailService;
    constructor(mailService: MailService);
    private sanitize;
    private wrapHtml;
    sendBookingConfirmationEmail(to: string, booking: {
        id: string;
        bookingDate: Date | string;
        checkInDate: Date | string;
        checkOutDate: Date | string;
        paymentMethod: string;
        status: string;
        plan: {
            name: string;
            price: string;
        };
        user: {
            name: string;
        };
    }): Promise<any>;
    sendBookingStatusUpdateEmail(to: string, booking: {
        id: string;
        status: string;
        plan: {
            name: string;
        };
        user: {
            name: string;
        };
    }, oldStatus: string, newStatus: string): Promise<any>;
    sendPaymentApprovedEmail(to: string, booking: {
        id: string;
        plan: {
            name: string;
            price: string;
        };
        user: {
            name: string;
        };
    }): Promise<any>;
    sendCheckInEmail(to: string, booking: {
        id: string;
        plan: {
            name: string;
        };
        user: {
            name: string;
        };
    }, benefitNames: string[]): Promise<any>;
}
