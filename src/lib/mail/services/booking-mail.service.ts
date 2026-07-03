import { Injectable } from '@nestjs/common';
import * as he from 'he';
import { MailService } from '../mail.service';

@Injectable()
export class BookingMailService {
  constructor(private readonly mailService: MailService) {}

  private sanitize(input: string | null | undefined): string {
    if (!input) return '';
    return he.encode(input);
  }

  private wrapHtml(innerHtml: string): string {
    const logoUrl =
      this.mailService.getLogoUrl() ||
      'https://via.placeholder.com/150x50/0A0E27/E8B923?text=GalaxyBooking';

    return `
      <div style="font-family:'Segoe UI',Arial,sans-serif; background-color:#0f1220; min-height:100%; padding:36px 16px; margin:0; box-sizing:border-box;">
        <div style="max-width:560px; margin:0 auto; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.35);">
          <!-- Header -->
          <div style="background-color:#0A0E27; padding:22px 0; border-radius:12px 12px 0 0; text-align:center;">
            <img src="${logoUrl}" alt="GalaxyBooking" style="max-height:38px; width:auto;" />
          </div>
          
          <!-- Body -->
          <div style="background-color:#ffffff; padding:36px 32px 28px;">
            ${innerHtml}
          </div>
          
          <!-- Footer -->
          <div style="background-color:#1A1F3A; padding:20px 28px; border-radius:0 0 12px 12px; text-align:center;">
            <p style="margin:0; font-size:13px; color:#A0A8B8; line-height:1.5;">
              Thank you for choosing GalaxyBooking. If you have any questions, reach out to our team at 
              <a href="mailto:terracottacreationbd@gmail.com" style="color:#E8B923; text-decoration:none;">terracottacreationbd@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    `;
  }

  async sendBookingConfirmationEmail(
    to: string,
    booking: {
      id: string;
      bookingDate: Date | string;
      checkInDate: Date | string;
      checkOutDate: Date | string;
      paymentMethod: string;
      status: string;
      plan: { name: string; price: string };
      user: { name: string };
    },
  ): Promise<any> {
    const formattedBookingDate = new Date(booking.bookingDate).toLocaleDateString();
    const formattedCheckIn = new Date(booking.checkInDate).toLocaleDateString();
    const formattedCheckOut = new Date(booking.checkOutDate).toLocaleDateString();

    const htmlContent = this.wrapHtml(`
      <h2 style="margin:0 0 16px; text-align:center; font-size:22px; font-weight:700; color:#0A0E27;">
        Booking Confirmed!
      </h2>
      <div style="width:48px; height:3px; background-color:#E8B923; margin:0 auto 22px; border-radius:2px;"></div>
      
      <p style="font-size:15px; color:#6B7280; line-height:1.7; margin:0 0 20px;">
        Hi ${this.sanitize(booking.user.name)},
      </p>
      <p style="font-size:15px; color:#6B7280; line-height:1.7; margin:0 0 20px;">
        Your booking has been successfully placed and is currently in <strong style="color:#E8B923;">${booking.status}</strong> stage. Below are your booking details:
      </p>

      <!-- Booking details box -->
      <table style="width:100%; border-collapse:collapse; margin-bottom:24px; font-size:14px; color:#4B5563;">
        <tr style="border-bottom:1px solid #E5E7EB;">
          <td style="padding:10px 0; font-weight:600;">Plan Selected:</td>
          <td style="padding:10px 0; text-align:right;">${this.sanitize(booking.plan.name)} (${booking.plan.price})</td>
        </tr>
        <tr style="border-bottom:1px solid #E5E7EB;">
          <td style="padding:10px 0; font-weight:600;">Booking Date:</td>
          <td style="padding:10px 0; text-align:right;">${formattedBookingDate}</td>
        </tr>
        <tr style="border-bottom:1px solid #E5E7EB;">
          <td style="padding:10px 0; font-weight:600;">Check-In Date:</td>
          <td style="padding:10px 0; text-align:right;">${formattedCheckIn}</td>
        </tr>
        <tr style="border-bottom:1px solid #E5E7EB;">
          <td style="padding:10px 0; font-weight:600;">Check-Out Date:</td>
          <td style="padding:10px 0; text-align:right;">${formattedCheckOut}</td>
        </tr>
        <tr style="border-bottom:1px solid #E5E7EB;">
          <td style="padding:10px 0; font-weight:600;">Payment Method:</td>
          <td style="padding:10px 0; text-align:right;">${booking.paymentMethod}</td>
        </tr>
        <tr>
          <td style="padding:10px 0; font-weight:600; color:#0A0E27;">Current Stage:</td>
          <td style="padding:10px 0; text-align:right; font-weight:700; color:#E8B923;">${booking.status}</td>
        </tr>
      </table>

      <div style="background-color:#F9FAFB; border-radius:8px; padding:16px; text-align:center;">
        <p style="margin:0; font-size:13px; color:#6B7280; line-height:1.5;">
          Booking Reference ID:<br/>
          <strong style="color:#0A0E27; font-family:monospace; font-size:14px;">${booking.id}</strong>
        </p>
      </div>
    `);

    const textContent = `Hi ${booking.user.name},\n\nYour booking for ${booking.plan.name} has been successfully placed. Reference ID: ${booking.id}.\nBooking Date: ${formattedBookingDate}\nCheck-in: ${formattedCheckIn}\nCheck-out: ${formattedCheckOut}\nPayment Method: ${booking.paymentMethod}\nStatus: ${booking.status}`;

    return this.mailService.sendMail({
      to,
      subject: `Booking Confirmed - ${booking.plan.name}`,
      html: htmlContent,
      text: textContent,
    });
  }

  async sendBookingStatusUpdateEmail(
    to: string,
    booking: {
      id: string;
      status: string;
      plan: { name: string };
      user: { name: string };
    },
    oldStatus: string,
    newStatus: string,
  ): Promise<any> {
    const htmlContent = this.wrapHtml(`
      <h2 style="margin:0 0 16px; text-align:center; font-size:22px; font-weight:700; color:#0A0E27;">
        Booking Stage Updated
      </h2>
      <div style="width:48px; height:3px; background-color:#10B981; margin:0 auto 22px; border-radius:2px;"></div>
      
      <p style="font-size:15px; color:#6B7280; line-height:1.7; margin:0 0 20px;">
        Hi ${this.sanitize(booking.user.name)},
      </p>
      <p style="font-size:15px; color:#6B7280; line-height:1.7; margin:0 0 20px;">
        The status of your booking for <strong style="color:#0A0E27;">${this.sanitize(booking.plan.name)}</strong> has been updated by the administrator.
      </p>

      <!-- Update status box -->
      <div style="display:flex; justify-content:center; align-items:center; background-color:#F3F4F6; border-radius:8px; padding:20px; margin-bottom:24px; text-align:center;">
        <div style="display:inline-block;">
          <span style="font-size:14px; color:#6B7280; text-decoration:line-through; margin-right:12px;">${oldStatus}</span>
          <span style="font-size:20px; color:#10B981; font-weight:700;">&rarr; ${newStatus}</span>
        </div>
      </div>

      <p style="font-size:14px; color:#6B7280; text-align:center; margin-bottom:20px;">
        Booking ID: <span style="font-family:monospace; color:#0A0E27; font-weight:600;">${booking.id}</span>
      </p>
    `);

    const textContent = `Hi ${booking.user.name},\n\nYour booking stage for ${booking.plan.name} has been updated from ${oldStatus} to ${newStatus}.`;

    return this.mailService.sendMail({
      to,
      subject: `Booking Stage Updated: ${newStatus}`,
      html: htmlContent,
      text: textContent,
    });
  }

  async sendPaymentApprovedEmail(
    to: string,
    booking: {
      id: string;
      plan: { name: string; price: string };
      user: { name: string };
    },
  ): Promise<any> {
    const htmlContent = this.wrapHtml(`
      <h2 style="margin:0 0 16px; text-align:center; font-size:22px; font-weight:700; color:#0A0E27;">
        Payment Approved!
      </h2>
      <div style="width:48px; height:3px; background-color:#10B981; margin:0 auto 22px; border-radius:2px;"></div>
      
      <p style="font-size:15px; color:#6B7280; line-height:1.7; margin:0 0 20px;">
        Hi ${this.sanitize(booking.user.name)},
      </p>
      <p style="font-size:15px; color:#6B7280; line-height:1.7; margin:0 0 20px;">
        Your payment for booking <strong style="color:#0A0E27;">${this.sanitize(booking.plan.name)}</strong> has been successfully approved. Your booking is now <strong>PAID</strong>.
      </p>

      <table style="width:100%; border-collapse:collapse; margin-bottom:24px; font-size:14px; color:#4B5563;">
        <tr style="border-bottom:1px solid #E5E7EB;">
          <td style="padding:10px 0; font-weight:600;">Plan Selected:</td>
          <td style="padding:10px 0; text-align:right;">${this.sanitize(booking.plan.name)} (${booking.plan.price})</td>
        </tr>
        <tr>
          <td style="padding:10px 0; font-weight:600; color:#0A0E27;">Status:</td>
          <td style="padding:10px 0; text-align:right; font-weight:700; color:#10B981;">PAID</td>
        </tr>
      </table>

      <div style="background-color:#F9FAFB; border-radius:8px; padding:16px; text-align:center;">
        <p style="margin:0; font-size:13px; color:#6B7280; line-height:1.5;">
          Booking Reference ID:<br/>
          <strong style="color:#0A0E27; font-family:monospace; font-size:14px;">${booking.id}</strong>
        </p>
      </div>
    `);

    const textContent = `Hi ${booking.user.name},\n\nYour payment for ${booking.plan.name} has been approved. Status is now PAID. Reference ID: ${booking.id}.`;

    return this.mailService.sendMail({
      to,
      subject: `Payment Approved for Booking - ${booking.plan.name}`,
      html: htmlContent,
      text: textContent,
    });
  }

  async sendCheckInEmail(
    to: string,
    booking: {
      id: string;
      plan: { name: string };
      user: { name: string };
    },
    benefitNames: string[],
  ): Promise<any> {
    const benefitsListHtml = benefitNames.length > 0
      ? `<ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #4B5563; line-height: 1.6;">
          ${benefitNames.map(b => `<li style="margin-bottom: 8px;">${this.sanitize(b)}</li>`).join('')}
         </ul>`
      : `<p style="font-size: 14px; color: #6B7280; margin: 0;">No specific benefits listed.</p>`;

    const htmlContent = this.wrapHtml(`
      <h2 style="margin:0 0 16px; text-align:center; font-size:22px; font-weight:700; color:#0A0E27;">
        Check-In Completed!
      </h2>
      <div style="width:48px; height:3px; background-color:#3B82F6; margin:0 auto 22px; border-radius:2px;"></div>
      
      <p style="font-size:15px; color:#6B7280; line-height:1.7; margin:0 0 20px;">
        Hi ${this.sanitize(booking.user.name)},
      </p>
      <p style="font-size:15px; color:#6B7280; line-height:1.7; margin:0 0 20px;">
        Your check-in for <strong style="color:#0A0E27;">${this.sanitize(booking.plan.name)}</strong> is complete. Enjoy your experience!
      </p>

      <div style="background-color:#F3F4F6; border-radius:8px; padding:20px; margin-bottom:24px;">
        <h4 style="margin:0 0 12px; font-size:15px; font-weight:600; color:#0A0E27;">Plan Benefits Included:</h4>
        ${benefitsListHtml}
      </div>

      <div style="background-color:#F9FAFB; border-radius:8px; padding:16px; text-align:center;">
        <p style="margin:0; font-size:13px; color:#6B7280; line-height:1.5;">
          Booking Reference ID:<br/>
          <strong style="color:#0A0E27; font-family:monospace; font-size:14px;">${booking.id}</strong>
        </p>
      </div>
    `);

    const textContent = `Hi ${booking.user.name},\n\nYour check-in is complete for ${booking.plan.name}. Reference ID: ${booking.id}.\nBenefits: ${benefitNames.join(', ')}`;

    return this.mailService.sendMail({
      to,
      subject: `Check-In Completed - ${booking.plan.name}`,
      html: htmlContent,
      text: textContent,
    });
  }
}

