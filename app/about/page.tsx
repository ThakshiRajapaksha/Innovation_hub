"use client";
import React from "react";
import { Button } from "@/components/ui/button"; // Assuming ShadCN Button component
import { useRouter } from "next/navigation";
import "../../styles/background.css";

function About() {
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
        <div className="bg-white rounded-lg shadow-lg p-8 w-3/4 max-w-xl"
        style={{
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
        >
          <h1 className="text-2xl font-bold mb-4 text-center">About Us</h1>
          <p className="text-black text-center">
            To address the societal focus on traditional career paths, EcoVent
            proposes creating an Innovation Hub where students can bring,
            develop, and showcase their innovative ideas. This Hub will nurture
            young talent, encouraging entrepreneurial thinking in the field of
            renewable energy and beyond.Through the EcoVent Innovation Hub,
            students can break away from traditional career constraints, pursue
            innovative projects, and potentially become entrepreneurs in the
            green energy space. This initiative not only supports talent
            development but also strengthens EcoVent’s mission to drive
            sustainable change, creating a generation of empowered,
            purpose-driven professionals.By positioning the EcoVent Innovation
            Hub as a launchpad for green tech startups and a source of valuable
            R&D, the company can generate profit while promoting sustainable
            innovation and expanding its influence in the renewable energy
            sector.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
