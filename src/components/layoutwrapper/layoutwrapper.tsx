"use client";

import { usePathname } from "next/navigation";

import HappyStayFooter from "../footer";
import Navbar from "../navbar";






export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideRoutes = ["/signin","/signup",
    "/seodashboard","/seo",
    "/onboarding",
    "/seo-login",
   
"/onboarding/role",
  
  "/blogs","/blogs/new","/blog/[slug]","/user","/admin","/driver"];
  const hideLayout = hideRoutes.includes(pathname) ||
 ["/admin-dashboard/", "/user/", "/admin/", "/driver/"].some((route) =>
    pathname.startsWith(route)
);

  return (
    <>
    
      
            {/* OR — Logged In */}
            {/* <Navbar
              scrolled={scrolled}
              isLoggedIn={true}
              user={{
                name: "Rahul Sharma",
                email: "rahul@example.com",
                avatar: "/avatar.jpg",
                isHost: true,
              }}
              onSignIn={() => console.log("Sign in")}
              onSignUp={() => console.log("Sign up")}
              onLogout={() => console.log("Logout")}
            />  */}
      {!hideLayout && <Navbar />}
      {children}
      
     
      {!hideLayout &&  <HappyStayFooter/> }
    </>
  );
}