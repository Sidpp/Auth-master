import {auth} from "./auth"
import {
DEFAULT_LOGIN_REDIRECT,
APIAUTHPREFIX,
AUTHROUTES,
PUBLICROUTES
} from "@/routes"



export default auth ((req)=>{
const { nextUrl } = req;
const isLoggedIn = !!req.auth; 
const isApiAuthRoute = nextUrl.pathname.startsWith(APIAUTHPREFIX);
const isPublicRoute = PUBLICROUTES.includes(nextUrl.pathname);
const isAuthRoute = AUTHROUTES.includes(nextUrl.pathname);

if( isApiAuthRoute) {
return undefined
};


if(isAuthRoute){
   if(isLoggedIn){
     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)) 
    }
    return undefined };
    
    if (req.headers.get("x-middleware-subrequest")) {
      return new Response("Forbidden", { status: 403 });
    }

if(!isLoggedIn && !isPublicRoute){
  let callbackUrl = nextUrl.pathname;
  if(nextUrl.search){
   callbackUrl+= nextUrl.search
  }
  const encodedCallbackUrl = encodeURIComponent(callbackUrl);
  return Response.redirect(new URL(
      `/auth/login?callbackUrl=${encodedCallbackUrl}`,nextUrl
  ));
}
return undefined;
})


export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'],
}