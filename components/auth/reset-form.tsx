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
import { ResetSchema} from "@/schemas";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { reset } from "@/actions/reset";


export const ResetForm = ()=>{
const [error,setError] = useState<string|undefined>("");
const [success,setSuccess] = useState<string|undefined>("");
const [isPending,startTransition] = useTransition();

const form = useForm<z.infer<typeof ResetSchema>>({
resolver:zodResolver(ResetSchema),
defaultValues:{
email:"",
}
}) 

const onSubmit= (values:z.infer<typeof ResetSchema>)=>{
setError("")
setSuccess("")

startTransition(()=>{
reset(values)
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
  headerlabel = {"Forget your Password"} 
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
  name = "email"
  render ={({field})=>(
<FormItem>
<FormLabel>Email </FormLabel>
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
</div>
<FormError message = {error}/>
<FormSuccess message = {success}/>
<Button 
disabled = {isPending}
type="submit" className="w-full  hover:bg-blue-500 hover:text-white transition-colors duration-200" >
Send Reset Mail
</Button>
</form>
</Form>
</CardWrapper>
)
}