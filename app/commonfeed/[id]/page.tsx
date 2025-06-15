"use client";
import React, { useEffect, useState } from "react";
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
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"feed" | "ads">("feed");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newAd, setNewAd] = useState<Ad>({
    id: "",
    title: "",
    description: "",
    imageUrl: null,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRes, adRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/ads"),
        ]);

        const [projectData, adData] = await Promise.all([
          projectRes.json(),
          adRes.json(),
        ]);

        if (projectRes.ok) setProjects(projectData.projects);
        if (adRes.ok) setAds(adData.ads);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewAd({ ...newAd, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setNewAd({ ...newAd, imageUrl: e.target.files[0] });
  };

  const handleCreateAd = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newAd.title);
      formData.append("description", newAd.description);
      if (newAd.imageUrl instanceof File)
        formData.append("image", newAd.imageUrl);

      const response = await fetch("/api/ads", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setAds([...ads, data.ad]);
        setIsModalOpen(false);
        setNewAd({ id: "", title: "", description: "", imageUrl: null });
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
      <header className="bg-white p-6 fixed top-0 left-0 right-0 z-50 w-full shadow-md">
        <nav>
          <ul className="flex items-center space-x-8 w-full">
            {["Home", "About", "Services", "Contact"].map((page) => (
              <li key={page}>
                <Button
                  variant="link"
                  onClick={() => router.push(`/${page.toLowerCase()}`)}
                >
                  {page}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="flex space-x-4 mt-24">
        {["feed", "ads"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "link"}
            onClick={() => setActiveTab(tab as "feed" | "ads")}
          >
            {tab === "feed" ? "News Feed" : "Ads"}
          </Button>
        ))}
      </div>

      <div className="flex flex-col items-center w-full mt-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {activeTab === "feed" ? "Project News Feed 🚀" : "Advertisements 🛍️"}
          {activeTab === "ads" && (
            <Button onClick={() => setIsModalOpen(true)} className="mt-6">
              Add New Ad
            </Button>
          )}
        </h1>

        {loading ? (
          <p className="text-gray-500">Loading content...</p>
        ) : (
          <div className="w-full max-w-2xl space-y-6 overflow-y-auto max-h-[60vh]">
            {(activeTab === "feed" ? projects : ads).map((item) => (
              <div key={item.id} className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600">{item.description}</p>
                {item.imageUrl && (
                  <img
                    src={typeof item.imageUrl === "string" ? item.imageUrl : ""}
                    alt={item.title}
                    className="w-full h-auto rounded-lg mb-4"
                  />
                )}
              </div>
            ))}
            {!ads.length && activeTab === "ads" && (
              <p className="text-gray-500">No ads available.</p>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold">Create New Ad</h2>
            <div className="space-y-4 mt-4">
              {["title", "description"].map((field) => (
                <input
                  key={field}
                  type={field === "description" ? "textarea" : "text"}
                  name={field}
                  placeholder={`Ad ${
                    field.charAt(0).toUpperCase() + field.slice(1)
                  }`}
                  value={newAd[field as keyof Ad] as string}
                  onChange={handleAdChange}
                  className="w-full p-2 border rounded"
                />
              ))}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded"
              />
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
