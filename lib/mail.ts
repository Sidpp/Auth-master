import {Resend} from "resend"
const domain = process.env.NEXT_PUBLIC_APP_URL;

const resend = new Resend(process.env.RESEND_API_KEY!) ;
export const SendPasswordResetEmail = async( email:string, token :string)=>{
const resetLink =`${domain}/auth/new-password?token=${token}`
await resend.emails.send({
from:"onboarding@resend.dev",
to: "leviakaraman7@gmail.com",
subject:"Reset your password",  
html:`<p> Click <a href="${resetLink}">here </a> to reset password </p>`

})
}



export const sendVerificationEmail = async(email:string,token:string) => {
const confirmLink = `${domain}/auth/new-verification?token=${token}`; 
await resend.emails.send({
from:"onboarding@resend.dev",
to: "leviakaraman7@gmail.com",
subject:"Confirm your email",  
html:`<p> Click <a href="${confirmLink}">here </a> to confirm email </p>`
});
};

export const sendTwoFactorTokenEmail = async(email:string,token:string) => {
await resend.emails.send({
from:"onboarding@resend.dev",
to: "leviakaraman7@gmail.com",
subject:"2FA code",  
html:`<p> Your 2FA code :${token} </p>`
});
};