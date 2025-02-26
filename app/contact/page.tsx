"use client";
import React from "react";
import { Button } from "@/components/ui/button"; // Assuming ShadCN Button component
import { useRouter } from "next/navigation";
import "../../styles/background.css";
import {motion} from "framer-motion";

function Contact() {
  const router = useRouter();

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
        <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
          <div className="bg-white rounded-lg shadow-lg p-8 w-4/4 max-w-xl mb-8"
          style={{
            backdropFilter: "blur(20px)",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
          >
            
            <h1 className="text-2xl font-bold mb-4 text-center">Contact Us</h1>
            <p className="text-black text-center mb-6">
              <b>Give us a call:</b> 0771234566 or (011)2815364
            </p>
          </div>
          </motion.h1>

          {/* Google Maps Embed */}
          <div className="w-4/4 max-w-xl items-center justify-center">
          <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
            <iframe
              className="w-full h-64 rounded-lg shadow-lg items-center justify-center"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.538212039222!2d79.87050937445863!3d6.8258770931719726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b27f0168547%3A0x9b8619e42cc5ffeb!2sFaculty%20of%20Engineering%20(Ratmalana%20Premises)%2C%20University%20of%20Sri%20Jayewardenepura!5e0!3m2!1sen!2slk!4v1740576635094!5m2!1sen!2slk"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
