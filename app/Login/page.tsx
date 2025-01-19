"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "../../styles/background.css";
import { useRouter } from "next/navigation"; // Import useRouter

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter(); // Initialize the useRouter hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    alert(data.message || data.error);

    // If login is successful, navigate to the feed page
    if (res.status === 200) {
      router.push("/feed"); // Navigate to the feed page
    }
  };

  const handleLoginClick = () => {
    router.push("/Login");
  };

  return (
    
    <div
      style={{
        backgroundImage: "url('/assets/home-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      className="flex w-full justify-center items-center p-6 overflow-auto"
    >
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
      <div className="w-full max-w-lg p-4 bg-white rounded shadow-lg mt-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
