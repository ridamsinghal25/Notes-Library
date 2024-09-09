import nodemailer from "nodemailer";

export async function sendEmail(options) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.APP_PASSWORD,
      },
    });

    let mailOptions = {
      from: {
        name: "Notes Library",
        address: process.env.USER,
      },
      to: options.email,
      subject: options.subject,
      html: options.htmlContent,
      text: options.textContent,
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: "Verification email sent successfully." };
  } catch (Emailerror) {
    console.log("Error occured while sending verification email: ", Emailerror);

    return { success: false, message: "Failed to send verification email." };
  }
}
