"use client";
import React from "react";
import { Button } from "@/components/ui/button"; // Assuming ShadCN Button component
import { useRouter } from "next/navigation";
import {motion} from "framer-motion";
import "../styles/background.css";

function Page() {
  const router = useRouter();

  const handleSignUpClick = () => {
    router.push("/Register");
  };

  const handleLoginClick = () => {
    router.push("/Login");
  };


  return (
    <div className="relative min-h-screen">
      {/* Navbar */}
      <header className="bg-white-800 p-6 fixed top-0 left-0 right-0 z-50 w-full">
        <nav>
          <ul className="flex items-center space-x-8 w-full">
            <li>
              <Button variant="link" onClick={() => router.push("/")}>
                Home
              </Button>
            </li>
            <li>
              <Button variant="link" onClick={() => router.push("/about")}>
                About
              </Button>
            </li>
            <li>
              <Button variant="link" onClick={() => router.push("/services")}>
                Services
              </Button>
            </li>
            <li>
              <Button variant="link" onClick={() => router.push("/contact")}>
                Contact
              </Button>
            </li>
            {/* Login Button - Rightmost corner */}
            <li className="ml-auto">
              <Button onClick={handleLoginClick}>Login</Button>
            </li>
            
          </ul>
        </nav>
      </header>

      {/* Content Section with Background Image */}
      <div className="background-container">
      <div className="background-container flex flex-col items-center justify-center min-h-screen text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-8xl font-bold text-white mb-12"
          style={{
            WebkitTextStroke: "2px white", // Black outline for WebKit browsers
            textShadow: "2px 2px 0 black, -2px -2px 0 black, -2px 2px 0 black, 2px -2px 0 black", // Cross-browser fallback
          }}
        >
          Welcome to Innovation Hub
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-4xl text-black mb-20"
        >
        <div className="bg-white/40 p-6 rounded-lg shadow-lg backdrop-blur-md">
          A platform for students to showcase their innovations to industry experts.
        </div>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Button onClick={handleSignUpClick} className="px-10 py-8 text-lg rounded-r-sm">
            <div className="text-lg md:text-3xl text-white">
              Sign Up
            </div>
          </Button>
        </motion.div>
      </div>
      </div>
    </div>
  );
}

export default Page;
