import nodemailer from 'nodemailer';

export function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendVerificationEmail(toEmail, otp) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'joshua92@ethereal.email',
            pass: 'JBUAFutEDfp5zdYQ2D'
        }
    });

    const mailOptions = {
        from: "Collabtask <no-reply@collabtask.com>",
        to: toEmail,
        subject: "Verify your Email !",
        html: `<h1>Welcome to CollabTask!</h1>
               <p>Your 6-digit verification code is:</p>
               <h2>${otp}</h2>
               <p>This code will expire in 10 minutes.</p>`,

    };

    try {
        const info = await transporter.sendMail(mailOptions);

        
        console.log("Verification email sent! Preview URL: " + nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

export async function sendLoginOTP(toEmail, otp) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'joshua92@ethereal.email',
            pass: 'JBUAFutEDfp5zdYQ2D'
        },
    });

    const mailOptions = {
        from: '"CollabTask" <noreply@collabtask.com>',
        to: toEmail,
        subject: 'Your CollabTask Login Code',
        html: `
            <h1>Your CollabTask Login Code</h1>
            <p>Your 6-digit one-time login code is:</p>
            <h2>${otp}</h2>
            <p>This code will expire in 5 minutes.</p>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent! Preview URL: " + nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error("Error sending email:", error);
    }
}