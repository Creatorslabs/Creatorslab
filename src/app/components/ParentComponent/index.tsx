"use client"; // since we're using Next.js 13 app router

import { usePathname } from "next/navigation";
import Navbar from "../Navbar";
import { ContextProvider } from "@/src/contexts/ContextProvider";

import { HeroUIProvider } from "@heroui/system";

const ParentComponent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Define routes where you don't want the Navbar to appear
  const hideNavbarRoutes = ["/login", "/signup", "/"];

  return (
    <>
      <ContextProvider>
        <HeroUIProvider>
          {/* Conditionally render Navbar based on the current route */}
          {!hideNavbarRoutes.includes(pathname) && <Navbar />}

          {/* Render the page content */}
          {children}
        </HeroUIProvider>
      </ContextProvider>
    </>
  );
};

export default ParentComponent;
