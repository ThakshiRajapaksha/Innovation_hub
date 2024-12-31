"use client";
import React from "react";
import { Button } from "@/components/ui/button"; // Assuming ShadCN Button component
import { useRouter } from "next/navigation";
import "../../styles/background.css";

function Contact() {
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
          
        <div className="background-container flex flex-col items-center justify-center min-h-screen pt-24">
        <div className="bg-white rounded-lg shadow-lg p-8 w-3/4 max-w-xl mb-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Contact Us</h1>
          <p className="text-black text-center mb-6">
            <b>Give us a call:</b> 0771234566 or (011)2815364
          </p>
        </div>

        {/* Google Maps Embed */}
        <div className="w-3/4 max-w-xl">
          <iframe
            className="w-full h-64 rounded-lg shadow-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d144.95543161565973!3d-37.81720997975161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727d8579d1a0e1!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1691234567890!5m2!1sen!2sau"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
          
        </div>
    </div>
  );
}

export default Contact;
