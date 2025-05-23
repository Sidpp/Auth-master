"use client";
import{
Card,
CardContent,
CardFooter,
CardHeader
}from "@/components/ui/card"

import { Header } from "./header";
import { Social } from "./social";
import { BackButton } from "./back-button";

interface CardWrapperProps{
  children:React.ReactNode;
  headerlabel:string;
  backButtonLabel: string;
  backButtonHref:string;
  showSocial?:boolean
}

export const CardWrapper =({
children,
headerlabel,
backButtonHref,
backButtonLabel,
showSocial
}:CardWrapperProps)=>{

 return( 
<Card className="w-[400px] shadow-md ">

<CardHeader>
 <Header label={headerlabel}/>
</CardHeader> 


 <CardContent>
 {children}
 </CardContent>

 {showSocial && (
   <CardFooter>
    <Social/>
    </CardFooter>
)}

<CardFooter>
<BackButton
label={backButtonLabel}
href={backButtonHref} 
/>
</CardFooter>
</Card>
)
}
