"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  description: string;
  department: string;
  imageUrl: string;
  createdAt: string;
  user?: {
    name: string;
  };
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
}

export default function ProjectComments() {
  const params = useParams();
  const router = useRouter();
  console.log("Params:", params); // Debugging

  const { projectId } = params as { projectId: string };

  const [project, setProject] = useState<Project | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}`);
        if (res.ok) {
          const data = await res.json();
          setProject(data.project);
        } else {
          console.error("Failed to fetch project data");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}/comments`);
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchProject();
    fetchComments();
  }, [projectId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`/api/projects/${projectId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });

      if (res.ok) {
        const data = await res.json();
        setComments([...comments, data.comment]);
        setNewComment("");
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!project) return <p className="text-gray-500">Loading project...</p>;

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
      <div className="max-w-2xl mx-auto p-6">
        <p className="text-sm text-gray-500 mb-2">
          Owner: {project.user ? project.user.name : "Unknown"}
        </p>
        <h1 className="text-2xl font-bold">Title:{project.title}</h1>
        <p className="text-gray-600">{project.description}</p>
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-auto rounded-lg mt-4"
          />
        )}
        <p className="text-sm text-gray-500">
          Department: {project.department}
        </p>
        <p className="text-xs text-gray-400">
          Created at: {new Date(project.createdAt).toLocaleString()}
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Comments</h2>
          <div className="space-y-4 mt-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-700">{comment.content}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>

          <div className="mt-4">
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <Button onClick={handleAddComment} className="mt-2">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
