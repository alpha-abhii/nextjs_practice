import nodemailer from "nodemailer"

export const sendEmail = async({email,emailType,userId}:any) =>{
    try {
        //TODO: configure mail for usages
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: true, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });
        
        const mailOptions = {
            from: 'learn8600.me@gmail.com',
            to: email,
            subject: emailType==='VERIFY'? "Verify Your email":"Reset Your Password",
            html: "<b>Hello world?</b>", // html body
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}