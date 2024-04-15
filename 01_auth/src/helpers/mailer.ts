import User from "@/models/userModel";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"

export const sendEmail = async({email,emailType,userId}:any) =>{
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(),10)
        //TODO: configure mail for usages
        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        }else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }
                
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "d228f7123cd219", //🚩
              pass: "b1200544618d11", //🚩
            }
          });
        
        const mailOptions = {
            from: 'learn8600.me@gmail.com',
            to: email,
            subject: emailType==='VERIFY'? "Verify Your email":"Reset Your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY"?"Verify your email": "Reset your password"} or copy and paste the link in your browser <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}