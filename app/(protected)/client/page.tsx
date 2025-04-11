"use client"
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

import  {Phone} from "lucide-react";

const ClientPage =  ()=>{

   const user = useCurrentUser();

return (
   
<div> 
 <UserInfo 
  user={user} 
  label={
    <span >
      <Phone size={16} /> User Info
    </span>
  }                                
             
 
 />

</div>
);
}

export default ClientPage;