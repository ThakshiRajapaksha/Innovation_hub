"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Project {
  id: string;
  title: string;
  description: string;
  department: string;
  imageUrl: string | File | null;
  createdAt: string;
}

interface Ad {
  id: string;
  title: string;
  description: string;
  imageUrl: string | File | null;
}

function CommonFeed() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [ads, setAds] = useState<Ad[]>([]); // For ads
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"feed" | "ads">("feed"); // State for tab switching
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // For handling modal visibility
  const [newAd, setNewAd] = useState<Ad>({
    id: "",
    title: "",
    description: "",
    imageUrl: null,
  });

  const router = useRouter();

  // Fetching projects and ads data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects"); // Adjust to your API endpoint
        const data = await response.json();

        if (response.ok) {
          setProjects(data.projects);
        } else {
          console.error("Error fetching projects:", data.error);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAds = async () => {
      try {
        const response = await fetch("/api/ads"); // Adjust to your API endpoint for ads
        const data = await response.json();

        if (response.ok) {
          setAds(data.ads);
        } else {
          console.error("Error fetching ads:", data.error);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchProjects();
    fetchAds();
  }, []);

  // Handle modal form change for new ad
  const handleAdChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewAd((prevAd) => ({
      ...prevAd,
      [name]: value,
    }));
  };

  // Handle image file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setNewAd((prevAd) => ({
        ...prevAd,
        imageUrl: file,
      }));
    } else {
      setNewAd((prevAd) => ({ ...prevAd, imageUrl: null })); // Use null instead of an empty string
    }
  };

  // Handle submit for creating a new ad
  const handleCreateAd = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newAd.title);
      formData.append("description", newAd.description);

      if (newAd.imageUrl instanceof File) {
        formData.append("image", newAd.imageUrl);
      }

      const response = await fetch("/api/ads", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setAds([...ads, data.ad]); // Add new ad to the list
        setIsModalOpen(false); // Close the modal
        setNewAd({ id: "", title: "", description: "", imageUrl: null }); // Clear inputs
        alert("Ad created successfully");
      } else {
        alert(data.error || "Error creating ad");
      }
    } catch (error) {
      console.error("Error creating ad:", error);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-20 pb-10">
      {/* Navbar */}
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

      {/* Tab Section */}
      <div className="flex space-x-4 mt-24">
        <Button
          variant={activeTab === "feed" ? "default" : "link"}
          onClick={() => setActiveTab("feed")}
        >
          News Feed
        </Button>
        <Button
          variant={activeTab === "ads" ? "default" : "link"}
          onClick={() => setActiveTab("ads")}
        >
          Ads
        </Button>
      </div>

      {/* News Feed or Ads Section */}
      <div className="flex flex-col items-center w-full mt-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {activeTab === "feed" ? "Project News Feed 🚀" : "Advertisements 🛍️"}
          {/* Add New Ad Button (Visible for any user inside the 'ads' tab) */}
          {activeTab === "ads" && (
            <Button onClick={() => setIsModalOpen(true)} className="mt-6">
              Add New Ad
            </Button>
          )}
        </h1>

        {/* Loading State */}
        {loading ? (
          <p className="text-gray-500">Loading content...</p>
        ) : activeTab === "feed" ? (
          <div className="w-full max-w-2xl space-y-6 overflow-y-auto max-h-[60vh]">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white shadow-lg rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {project.title}
                </h2>
                <p className="text-sm text-gray-600">{project.description}</p>
                {project.imageUrl && (
                  <img
                    src={
                      typeof project.imageUrl === "string"
                        ? project.imageUrl
                        : ""
                    }
                    alt={project.title}
                    className="w-full h-auto rounded-lg mb-4"
                  />
                )}
                <p className="text-sm text-gray-500">
                  Department: {project.department}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(project.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-2xl space-y-6 overflow-y-auto max-h-[60vh]">
            {ads.length > 0 ? (
              ads.map((ad) => (
                <div key={ad.id} className="bg-white shadow-lg rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {ad.title}
                  </h2>
                  <p className="text-sm text-gray-600">{ad.description}</p>
                  {ad.imageUrl && (
                    <img
                      src={typeof ad.imageUrl === "string" ? ad.imageUrl : ""}
                      alt={ad.title}
                      className="w-full h-auto rounded-lg mb-4"
                    />
                  )}
                  {/* Delete button for each ad */}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No ads available.</p>
            )}
          </div>
        )}
      </div>

      {/* Modal for creating new ad */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold">Create New Ad</h2>
            <div className="space-y-4 mt-4">
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Ad Title"
                  value={newAd.title}
                  onChange={handleAdChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <textarea
                  name="description"
                  placeholder="Ad Description"
                  value={newAd.description}
                  onChange={handleAdChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border rounded"
                />
              </div>
              {newAd.imageUrl &&
                typeof newAd.imageUrl === "string" &&
                newAd.imageUrl.trim() !== "" && (
                  <div className="mt-4">
                    <Image
                      src={newAd.imageUrl}
                      alt="Preview"
                      className="w-full h-auto rounded"
                      width={500}
                      height={500}
                    />
                  </div>
                )}
              <div className="flex justify-end space-x-4 mt-4">
                <Button
                  onClick={handleCreateAd}
                  className="bg-blue-500 text-white"
                >
                  Create Ad
                </Button>
                <Button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 text-white"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommonFeed;
