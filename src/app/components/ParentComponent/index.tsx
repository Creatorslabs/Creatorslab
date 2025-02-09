"use client"; // since we're using Next.js 13 app router

import { usePathname } from "next/navigation";
import Navbar from "../Navbar";
import { ContextProvider } from "@/src/contexts/ContextProvider";

const ParentComponent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Define routes where you don't want the Navbar to appear
  const hideNavbarRoutes = ["/auth/login", "/auth/signup", "/landing"];

  return (
    <>
      <ContextProvider>
        {/* Conditionally render Navbar based on the current route */}
        {!hideNavbarRoutes.includes(pathname) && <Navbar />}

        {/* Render the page content */}
        {children}
      </ContextProvider>
    </>
  );
};

export default ParentComponent;
