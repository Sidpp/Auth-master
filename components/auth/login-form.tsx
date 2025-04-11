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
import Link from "next/link"
import {LoginSchema} from "@/schemas";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams} from "next/navigation";
export const LoginForm = ()=>{
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl")
const urlError = searchParams.get("error")==="OAUTHAccountNotLinked"
 ? "Email already in use with different provider!"
 :"";

const [showTwoFactor,setShowTwoFactor] = useState(false);
const [error,setError] = useState<string|undefined>("");
const [success,setSuccess] = useState<string|undefined>("");
const [isPending,startTransition] = useTransition();

const form = useForm<z.infer<typeof LoginSchema>>({
  resolver:zodResolver(LoginSchema),
  defaultValues:{
  email:"",
  password:"",
  }
}) 
const onSubmit= (values:z.infer<typeof LoginSchema>)=>{
  setError("")
  setSuccess("")

 startTransition(()=>{
 login(values,callbackUrl)
 .then((data)=>{
  if (data?.error) {
   form.reset();
   setError(data.error)
  }
  if(data?.success){
    form.reset();
    setSuccess(data.success)
  } 
  
  if(data?.twoFactor){
    setShowTwoFactor(true)
  }
})
.catch(()=>setError("somethig went wrong"))
});
};

return( 
  <CardWrapper 
  headerlabel={!showTwoFactor?"Welcome back":"Enter Code "} 
  backButtonLabel={"Don't have an account"} 
  backButtonHref={"/auth/register"}
  showSocial>

<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)}
  className="space-y-6"
  > 
<div className="space-y-4">

 { showTwoFactor && (
  <FormField
  control = {form.control}
  name = "code"
  render ={({field})=>(
<FormItem>
<FormLabel>Two Factor Code</FormLabel>
<FormControl> 
  <Input {...field}
  disabled={isPending}
   placeholder="123456"
/>
</FormControl>
<FormMessage />
</FormItem>
)}
/>

)
}

{ !showTwoFactor && (
  <>
<FormField
  control = {form.control}
  name = "email"
  render ={({field})=>(
<FormItem>
<FormLabel>Email</FormLabel>
<FormControl> 
  <Input {...field}
  disabled={isPending}
   placeholder="jhon.doe@example.com"
   type="email"
  />
</FormControl>
<FormMessage />
</FormItem>
)}
/>
<FormField
  control = {form.control}
  name = "password"
  render ={({field})=>(
<FormItem>
<FormLabel>Password</FormLabel>
<FormControl> 
  <Input {...field}
  disabled={isPending}
   placeholder="*******"
   type = "password"
  />
</FormControl>
<FormMessage/>
</FormItem>
)}
/> 
</> )}  
</div>

<FormError message = {error|| urlError}/>
<FormSuccess message = {success}/>

<Button
 size = "sm"
 variant="link"
 asChild
 className="px-0 font normal"
>
<Link href="/auth/reset">      
Forget Password
</Link>
</Button>


<Button 
 disabled={isPending}
type="submit" className="w-full  hover:bg-blue-500 hover:text-white transition-colors duration-200" >
{ showTwoFactor? "Confirm" : "Login"}
</Button>
</form>
</Form>
</CardWrapper>
)
} 