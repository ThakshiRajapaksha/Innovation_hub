"use client";
import React from "react";
import { Button } from "@/components/ui/button"; // Assuming ShadCN Button component
import { useRouter } from "next/navigation";
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
        <Button onClick={handleSignUpClick}>Sign Up</Button>
      </div>
    </div>
  );
}

export default Page;
