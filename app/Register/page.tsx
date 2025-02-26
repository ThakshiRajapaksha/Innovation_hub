"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "../../styles/background.css";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const roles = [
  { value: "ADMIN", label: "Admin" },
  { value: "STUDENT", label: "Student" },
  { value: "LAWYER", label: "Lawyer" },
  { value: "ACCOUNTANT", label: "Accountant" },
  { value: "CIVIL_ENGINEER", label: "Civil Engineer" },
  { value: "COMPUTER_ENGINEER", label: "Computer Engineer" },
  { value: "MECHANICAL_ENGINEER", label: "Mechanical Engineer" },
  { value: "ELECTRICAL_ENGINEER", label: "Electrical & Electronic Engineer" },
];

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<string>(roles[0].value);
  const [agree, setAgree] = useState<boolean>(false); // New state for agreement checkbox
  const router = useRouter(); // Initialize the useRouter hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Check if the user agreed to the policies
    if (!agree) {
      alert("You must agree to the policies and laws!");
      return;
    }

    console.log("Submitting data:", { name, email, password, role });

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      console.log("Response data:", data); // Debugging response

      if (res.ok) {
        alert(data.message || "Registration successful!");

        // Instead of extracting user ID, use the redirectUrl provided in the response
        const redirectUrl = data.redirectUrl;

        if (!redirectUrl) {
          alert("Redirect URL not found. Please try again.");
          return;
        }

        console.log("Navigating to:", redirectUrl);

        // Navigate to the dynamic route using redirectUrl
        router.push(redirectUrl);
      } else {
        alert(data.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
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
      <header className="bg-white-800 p-5 fixed top-0 left-0 right-0 z-50 w-full">
        <nav>
          <ul className="flex items-center space-x-8 w-full">
            <li>
              <Button
                variant="link"
                onClick={() => router.back()}
                className="text-2xl hover:text-gray-400 transition-colors"
              >
                ←
              </Button>
            </li>
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

      <div className="w-full max-w-lg p-4 bg-white rounded shadow-lg mt-24">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">Register</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={setRole} defaultValue={role}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Your Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="agree"
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  required
                />
                <Label htmlFor="agree" className="text-sm">
                  I agree to the{" "}
                  <a href="/terms" className="text-blue-500">
                    Terms and Conditions, Privacy and Policy
                  </a>{" "}
                </Label>
              </div>
              <Button type="submit" className="han">
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
