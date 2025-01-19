"use client";
import React from "react";
import { Button } from "@/components/ui/button"; // Assuming ShadCN Button component
import { useRouter } from "next/navigation";
import "../../styles/background.css";

function Feed() {
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
            <li>
              <Button variant="link" onClick={() => router.push("/feed")}>
                Feed
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
        {/* Layout */}
      <div className="background-container flex-1 pt-4 h-screen">
        {/* Static Left Box */}
        <div className="bg-white rounded-lg shadow-lg p-2 w-1/4 max-h-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Add a Project</h1>
    <form className="space-y-4">
      {/* Project Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Project Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter project title"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter project description"
          required
        />
      </div>

      {/* Engineering Departments */}
      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">
          Engineering Department
        </label>
        <select
          id="department"
          name="department"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">Select a department</option>
          <option value="civil">Civil Engineering</option>
          <option value="mechanical">Mechanical Engineering</option>
          <option value="electrical">Electrical Engineering</option>
          <option value="computer">Computer Engineering</option>
        </select>
      </div>

      {/* Upload Image */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit Project
      </button>
    </form>
        </div >
        {/* Scrollable Right Boxes */}
        <div className="flex-1 overflow-y-auto pl-4" style={{ height: "calc(100vh - 12rem)" }}>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-4">
            <h2 className="text-xl font-bold mb-2 text-center">Box 1</h2>
            <p className="text-black">
              This is the content for Box 1. It can contain any description.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-4">
            <h2 className="text-xl font-bold mb-2 text-center">Box 2</h2>
            <p className="text-black">
              This is the content for Box 2. It can contain more descriptions.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-4">
            <h2 className="text-xl font-bold mb-2 text-center">Box 3</h2>
            <p className="text-black">
              This is the content for Box 3. Add additional descriptions here.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-4">
            <h2 className="text-xl font-bold mb-2 text-center">Box 4</h2>
            <p className="text-black">
              This is the content for Box 4. The right section is scrollable.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-4">
            <h2 className="text-xl font-bold mb-2 text-center">Box 5</h2>
            <p className="text-black">
              This is the content for Box 5. The right section is scrollable.
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
