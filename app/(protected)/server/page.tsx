
import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";
import { Laptop } from "lucide-react";

const ServerPage = async () => {
const user =  await currentUser();

return (
   
<div> 
 <UserInfo 
  user={user} 
  label={
    <span >
      <Laptop size={16} /> User Info
    </span>
  }                                
             
 
 />

</div>
);
}

export default ServerPage;