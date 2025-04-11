import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = ()=>{
    return (
   <CardWrapper 
    headerlabel="Oops! Something went wrong!"
    backButtonLabel="Back to login "
    backButtonHref="/auth/login" 
    >
    <div className="w-full flex justify-center item-center" >
    <ExclamationTriangleIcon className="text-destructive" />
    </div>

   </CardWrapper>    
    );
}


