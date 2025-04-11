"use client"
import {BeatLoader} from "react-spinners";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback,useEffect,useState } from "react";
import {newVerification } from "@/actions/new-verification";
import {FormError} from "@/components/form-error";
import { FormSuccess } from "../form-success";
 
export const NewVerificationForm  = () => {
const searchParams = useSearchParams();  
const token = searchParams.get("token"); 
const [error,setError] = useState<string| undefined>();
const [success,setSuccess] = useState<string| undefined>();

const onSubmit = useCallback(()=>{
 if(success || error ) return;  // break the function
 if(!token){
 setError("Missing token!");
 return;
 } 

newVerification(token)
 .then((data)=>{
setSuccess(data.success);
setError(data.error);
 })
 .catch(()=>{
    setError("Something went wrong!")
 })
 },[token,success,error]);

useEffect(()=>{
onSubmit();
}, [onSubmit]);


return ( 
<CardWrapper
headerlabel="Confirming your verification"
backButtonLabel="Back to login"
backButtonHref="/auth/login"
>
<div className="flex item-center w-full justify-center">
{!success && !error &&(
<BeatLoader/>
)}

<FormSuccess message={success}/>

{!success && (
<FormError message ={error} />
)}
</div>

</CardWrapper>
);
}
 
