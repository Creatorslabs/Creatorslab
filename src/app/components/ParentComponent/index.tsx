"use client"; // since we're using Next.js 13 app router

import { usePathname } from "next/navigation";
import { ContextProvider } from "@/src/contexts/ContextProvider";
import { Bounce, ToastContainer } from "react-toastify";
import { useThemeMode } from "flowbite-react";
import Navbar from "../nav-bar";

const ParentComponent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Define routes where you don't want the Navbar to appear
  const hideNavbarRoutes = ["/login", "/signup", "/", "/waitlist", "/terms", "/privacy", "_not-found"];

  const { computedMode } = useThemeMode()


  return (
    <>
      <ContextProvider>
        {/* Conditionally render Navbar based on the current route */}
        {!hideNavbarRoutes.includes(pathname) && <Navbar />}

        {/* Render the page content */}
        {children}
        <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={ computedMode === "dark" ? "dark" : "light"}
              transition={Bounce}
            />
      </ContextProvider>
    </>
  );
};

export default ParentComponent;
