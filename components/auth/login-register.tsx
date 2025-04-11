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
import {RegisterSchema} from "@/schemas";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { Register } from "@/actions/register";

export const RegisterForm = ()=>{
const [error,setError] = useState<string|undefined>("");

const [success,setSuccess] = useState<string|undefined>("");

const [isPending,startTransition] = useTransition();
 
const form = useForm<z.infer<typeof RegisterSchema>>({
  resolver:zodResolver(RegisterSchema),
  defaultValues:{
    name:"",
  email:"",
  password:"",
  }
}) 

const onSubmit= (values:z.infer<typeof RegisterSchema>)=>{
  setError("")
  setSuccess("")
 startTransition(()=>{
 Register(values)
 .then((data)=>{
  setError(data.error);
  setSuccess(data.success);
  })
});
};


return( 
  <CardWrapper 
  headerlabel={"Create an Account"} 
  backButtonLabel={"Already have an account"} 
  backButtonHref={"/auth/login"}
  showSocial>

<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)}
  className="space-y-6">
     
<div className="space-y-4">

<FormField
  control = {form.control}
  name = "name"
  render ={({field})=>(
<FormItem>
<FormLabel>Name</FormLabel>
<FormControl> 
  <Input {...field}
  disabled={isPending}
   placeholder="Jhon doe"
   type = "name"
  />
</FormControl>
<FormMessage />
</FormItem>
)}
/>

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
<FormMessage />
</FormItem>
)}
/>

</div>

<FormError message ={error}/>
<FormSuccess message ={success}/>

<Button 
 disabled={isPending}
type="submit" className="w-full  hover:bg-blue-500 hover:text-white transition-colors duration-200" >
Create Account
</Button>
</form>
</Form>
</CardWrapper>
)
}