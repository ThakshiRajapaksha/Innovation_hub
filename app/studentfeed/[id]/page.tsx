"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation"; // Import useParams
import { Button } from "@/components/ui/button";
import "../../../styles/background.css"; // Adjusted relative path

function Feed() {
  const router = useRouter();
  const { id } = useParams(); // Get dynamic id from URL

  // State for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // TODO: Fetch actual user role from API instead of hardcoded ID
  const userId = id; // Now userId is dynamically set from the URL

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !department) {
      alert("All fields except image are required!");
      return;
    }

    setLoading(true);
    let imageUrl = null;

    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (uploadRes.ok) {
        imageUrl = uploadData.fileUrl;
      } else {
        alert("Image upload failed!");
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          department,
          imageUrl,
          userId, // Use the dynamic userId from the URL
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Project submitted successfully!");
        setTitle("");
        setDescription("");
        setDepartment("");
        setImage(null);

        // Adding a small delay before navigation
        setTimeout(() => {
          router.push(`/commonfeed/${id}`); // Ensure redirection is dynamic
        }, 500);
      } else {
        alert(data.error || "Failed to submit project.");
      }
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen background-container flex flex-col items-center pt-20 pb-10">
      <header className="bg-white p-6 fixed top-0 left-0 right-0 z-50 w-full shadow-md">
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
          </ul>
        </nav>
      </header>

      {/* Form Section */}
      <div className="flex justify-center items-center w-full">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl backdrop-blur-md bg-opacity-90">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Add Your Idea 💡
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Project Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-700 focus:border-gray-700 transition-all"
                placeholder="Enter project title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-700 focus:border-gray-700 transition-all"
                placeholder="Enter project description"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Engineering Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-700 focus:border-gray-700 transition-all bg-white"
                required
              >
                <option value="">Select a department</option>
                <option value="civil">Civil Engineering</option>
                <option value="mechanical">Mechanical Engineering</option>
                <option value="electrical">Electrical Engineering</option>
                <option value="computer">Computer Engineering</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Upload Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm cursor-pointer bg-white focus:ring-gray-700 focus:border-gray-700 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-500" : "bg-black hover:bg-gray-800"
              } text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-md`}
            >
              {loading ? "Submitting..." : "Submit Project 🚀"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Feed;
