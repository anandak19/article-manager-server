export const generateOtpHtml = (otp: string): string => {
  return `
    <div style="font-family:Arial,sans-serif;">
      <h3>Email Verification</h3>
      <p>Your one-time password (OTP) is:</p>
      <div style="
        background:#f4f4f4;
        display:inline-block;
        padding:10px 20px;
        border-radius:6px;
        font-size:18px;
      ">
        <b>${otp}</b>
      </div>
      <p>This OTP will expire in 120 seconds.</p>
    </div>
  `;
};
