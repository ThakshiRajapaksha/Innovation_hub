"use client";
import React from "react";
import { Button } from "@/components/ui/button"; // Assuming ShadCN Button component
import { useRouter } from "next/navigation";
import "../../styles/background.css";

function Services() {
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
        <div className="bg-white rounded-lg shadow-lg p-8 w-3/4 max-w-xl">
          <h1 className="text-2xl font-bold mb-4 text-center">Services</h1>
          <p className="text-black text-left">
            <b>Idea Incubation and Mentorship</b>
            <br />
            The Innovation Hub will provide a space for students to present
            their ideas in renewable energy, sustainability, and tech
            innovation.EcoVent’s engineering team—experts in civil, mechanical,
            electrical, and computer engineering—will mentor students, helping
            them refine their ideas and understand the practical aspects of
            renewable energy.
            <br />
            <br />
            <b>Hands-On Technical Guidance</b>
            <br />
            Leveraging EcoVent’s technical expertise, students will gain access
            to knowledge in wind power design, power generation systems,
            structural engineering, and software applications, gaining essential
            skills in clean tech innovation. By collaborating with EcoVent’s
            engineers, students will understand how to turn concepts into viable
            solutions, preparing them to become future green tech entrepreneurs.
            <br />
            <br />
            <b>Pathway to Entrepreneurship</b>
            <br />
            The Hub will support students in developing business models around
            their innovations, offering resources and networks for launching
            sustainable start-ups. With guidance on product development and
            market strategies, students can launch initiatives that contribute
            to the renewable energy sector, fostering a culture of green
            entrepreneurship.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;
