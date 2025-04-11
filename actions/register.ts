"use server"
import *as z from "zod"
import {RegisterSchema} from "@/schemas";
import bcrypt from "bcryptjs"
import { db } from "@/lib/db";
import { generateVerificationToken} from "@/lib/token"
import { sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/user";
export const Register = async (values:z.infer <typeof RegisterSchema>) => {
const validatedFields = RegisterSchema.safeParse(values);

if(!validatedFields.success){
  return {error:"Invalid fields"}
}

const {email,password,name} = validatedFields.data;
const hashedpassword = await bcrypt.hash(password,10);

const existingUser = await getUserByEmail(email);

if( existingUser){
  return {error: "Email already in use!"};
}

 await db.user.create({
  data:{
    name,
    email,
    password:hashedpassword,
  },
});

const verificationToken = await generateVerificationToken(email);
await sendVerificationEmail (
  verificationToken.email,
  verificationToken.token,
)

return {success:"Confirmation email sent"};
};