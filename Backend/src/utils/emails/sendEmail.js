import { resend } from "../utils/resend.js";

export async function sendEmail(options) {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: options.email,
      subject: options.subject,
      html: options.htmlContent,
      text: options.textContent,
    });

    return { success: true, message: "Verification email sent successfully." };
  } catch (Emailerror) {
    console.log("Error occured while sending verification email: ", Emailerror);

    return { success: false, message: "Failed to send verification email." };
  }
}
