import nodemailer from "nodemailer";
import config from "../config";

interface EmailOptions {
  to: string; // Recipient's email address
  subject: string; // Subject of the email
  html: string; // HTML content of the email
  from?: string; // Sender's email address (optional, defaults to a predefined address)
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // SMTP server hostname or IP address
      port: 587, // SMTP server port (e.g., 587 for TLS)
      secure: false,
      auth: {
        user: config.smtp_user, // SMTP username
        pass: config.smtp_pass, // SMTP password or app-specific password
      },
    } as nodemailer.TransportOptions); // Explicitly cast to nodemailer.TransportOptions

    const mailOptions = {
      from: options.from || config.smtp_user, // Default sender if not provided
      to: options.to, // Recipient's email
      subject: options.subject, // Email subject
      html: options.html, // Email content (HTML format)
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${options.to}`);
  } catch (error) {
    console.error(`Failed to send email to ${options.to}:`, error);
    throw new Error("Email sending failed.");
  }
};

export default sendEmail;
