"use client"
import { CardWrapper } from "./card-wrapper";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NewPasswordSchema} from "@/schemas";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button"; 
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { PasswordReset } from "@/actions/PasswordReset";


export const NewPasswordForm = ()=>{
const searchParams = useSearchParams();
const token = searchParams.get("token");
const [error,setError] = useState<string|undefined>("");
const [success,setSuccess] = useState<string|undefined>("");
const [isPending,startTransition] = useTransition();

const form = useForm<z.infer<typeof NewPasswordSchema>>({
resolver:zodResolver( NewPasswordSchema),
defaultValues:{
password:"",
}
}) 

const onSubmit= (values:z.infer<typeof  NewPasswordSchema>)=>{
setError("")
setSuccess("")

startTransition(()=>{
PasswordReset(values,token)
.then((data)=>{
  if (data) {
setError(data.error);
setSuccess(data.success);
  }
  })
});
};

return( 

<CardWrapper 
headerlabel = {"Enter new Password "} 
backButtonLabel = {"Back to login"} 
backButtonHref = {"/auth/login"}
>

<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)}
className="space-y-6"
>

<div className="space-y-4">
  <FormField
  control = {form.control}
  name = "password"
  render ={({field})=>(
<FormItem>
<FormLabel>Password </FormLabel>
<FormControl> 
  <Input {...field}
  disabled={isPending}
   placeholder="******"
   type="password"
  />
</FormControl>
<FormMessage />
</FormItem>
)}
/>



</div>
<FormError message = {error}/>
<FormSuccess message = {success}/>
<Button 
disabled = {isPending}
type="submit" className="w-full  hover:bg-blue-500 hover:text-white transition-colors duration-200" >
Reset Password 
</Button>
</form>
</Form>
</CardWrapper>
)
}