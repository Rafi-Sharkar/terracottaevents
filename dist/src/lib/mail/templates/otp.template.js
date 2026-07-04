"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpTemplate = void 0;
const otpTemplate = ({ title, message, code, footer, logoUrl, }) => `
<div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f1220; padding: 36px 16px; margin: 0; box-sizing: border-box;">
  <div style="max-width: 560px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.35);">

    <!-- Header -->
    <!-- Body -->
    <div style="background-color: #ffffff; padding: 36px 32px 28px;">

      <!-- Title -->
      <h2 style="margin: 0 0 12px; text-align: center; font-size: 22px; font-weight: 700; color: #0A0E27;">
        ${title}
      </h2>

      <!-- Gold Accent Line -->
      <div style="width: 48px; height: 3px; background-color: #E8B923; margin: 0 auto 22px; border-radius: 2px;"></div>

      <!-- Message -->
      <p style="font-size: 15px; color: #6B7280; line-height: 1.7; margin: 0 0 28px; text-align: center;">
        ${message}
      </p>

      <!-- OTP Code Box -->
      <div style="background-color: #0A0E27; border-radius: 10px; padding: 24px 16px; text-align: center; margin-bottom: 22px;">
        <p style="margin: 0 0 6px; font-size: 12px; color: #A0A8B8; text-transform: uppercase; letter-spacing: 1.6px;">
          Your Verification Code
        </p>
        <p style="margin: 0; font-size: 36px; font-weight: 700; color: #E8B923; letter-spacing: 10px; font-family: 'Courier New', monospace;">
          ${code}
        </p>
      </div>

      <!-- Expiry Note -->
      <p style="font-size: 13px; color: #A0A8B8; text-align: center; margin: 0; line-height: 1.5;">
        This code expires in <strong style="color: #6B7280;">10 minutes</strong>. Do not share it with anyone.
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #1A1F3A; padding: 20px 28px; text-align: center;">
      <p style="margin: 0; font-size: 13px; color: #A0A8B8; line-height: 1.5;">
        ${footer}
      </p>
    </div>

  </div>
</div>
`;
exports.otpTemplate = otpTemplate;
//# sourceMappingURL=otp.template.js.map