import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    const verifyHtml = `
  <p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to verify your email.</p>
  <p>Or copy and paste this link in your browser:</p>
  <p>${process.env.DOMAIN}/verifyEmail?token=${hashedToken}</p>
`;

    const resetHtml = `
  <p>Click <a href="${process.env.DOMAIN}/resetPassword?token=${hashedToken}">here</a> to reset your password.</p>
  <p>Or copy and paste this link in your browser:</p>
  <p>${process.env.DOMAIN}/resetPassword?token=${hashedToken}</p>
`;
    const htmlContent = emailType === "VERIFY" ? verifyHtml : resetHtml;

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b2257d59324068", // just use .env lad
        pass: "c1964ce96a39f4", // just use .env lad
      },
    });

    const mailOtipon = {
      from: "SakshamShukla@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your Email" : "Reset your password",
      text: "Hello world?", // plain‑text body
      html: htmlContent,
    };

    const mailRes = await transporter.sendMail(mailOtipon);
    return mailRes;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
