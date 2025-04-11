"use server"
import { SettingsSchema } from "@/schemas"
import {db} from "@/lib/db"
import { getUserByEmail, getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import * as z from "zod"
import { generateVerificationToken } from "@/lib/token"
import { sendVerificationEmail } from "@/lib/mail"
import bcrypt from "bcryptjs"

export const Settings = async (values:z.infer<typeof SettingsSchema>) => {

const user = await currentUser();
if(!user){
  return {error:"Unauthorized"}
}

const dbuser = await getUserById(user.id as string);

if(!dbuser){
  return {error:"User not found"}
}


if (user.isOAuth) {
values.email = undefined
values.password= undefined
values.newPassword=undefined
values.isTwoFactorEnabled=undefined
}

if(values.email && values.email!==user.email){
  const existingUser = await getUserByEmail(values.email);
  
  if (existingUser && existingUser.id!==user.id){
    return {error:"Email already in use"}
  }

  const verificationToken = await generateVerificationToken(values.email);
  await sendVerificationEmail(verificationToken.email,verificationToken.token);

  return {success:"Verification email sent!"}
}


if(values.password && values.newPassword && dbuser.password){
const passwordMatch = await bcrypt.compare(
  values.password,
  dbuser.password
); 

if(!passwordMatch){
  return {error:"Incorrect password"}
}
const hashedpassowrd = await bcrypt.hash(values.newPassword,10);
values.password = hashedpassowrd;
values.newPassword = undefined;
}

await db.user.update({
where:{id:dbuser.id},
data:{
    ...values
} 
});
return {success:"Settings updated"}

}