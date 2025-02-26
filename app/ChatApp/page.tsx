"use client";

import React, { useState, useEffect } from "react";
import { Send, User, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import "../../styles/background.css";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
}

const ChatApp = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode
      ? JSON.parse(savedMode)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages([...messages, message]);
      setNewMessage("");

      setTimeout(() => {
        const response: Message = {
          id: Date.now() + 1,
          text: `Reply to: ${newMessage}`,
          sender: "other",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, response]);
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navigateToPage = () => {
    router.push("/"); 
  };

  return (
    <div className={`fixed inset-0 flex flex-col ${darkMode ? "bg-gray-900" : "bg-gray-100"}`} 
    style={{
      backgroundImage: `url("../public/assets/home-bg.jpg")`, // Add the path to your image
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundAttachment: 'fixed', 
    }}
    >  
      {/* Chat Header */}
      <div
        className={`p-4 flex justify-between items-center ${
          darkMode ? "bg-black text-white border-b border-gray-700" : "bg-gray-300 text-gray-900 border-b border-gray-400"
        }`}
      >
        <button
          onClick={navigateToPage}
          className={`p-2 rounded-md ${
            darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          {darkMode ? "← Back" : "← Back"}
        </button>
        
        <h1 className="text-xl font-bold">INNOVATION HUB - Chat</h1>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${
            darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          {darkMode ? <Moon className="w-5 h-5 text-white" /> : <Sun className="w-5 h-5 text-yellow-600" />}
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto">
        
        {messages.map((message) => (
          <div key={message.id} className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex items-start space-x-2 max-w-lg ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className="flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    darkMode ? "bg-gray-700" : "bg-gray-400"
                  }`}
                >
                  <User className={`w-5 h-5 ${darkMode ? "text-gray-300" : "text-gray-700"}`} />
                </div>
              </div>
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.sender === "user"
                    ? darkMode
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-gray-900"
                    : darkMode
                    ? "bg-gray-700 text-gray-100"
                    : "bg-gray-300 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div
        className={`border-t p-4 ${
          darkMode ? "border-gray-700 bg-black" : "border-gray-400 bg-gray-200"
        }`}
      >
        <div className="flex items-center space-x-2 max-w-6xl mx-auto">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className={`flex-1 px-4 py-2 border rounded-full focus:outline-none ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-gray-600"
                : "bg-gray-100 border-gray-500 text-gray-900 placeholder-gray-600 focus:border-gray-600"
            }`}
          />
          <button
            onClick={handleSendMessage}
            className={`p-2 rounded-full text-white transition-colors ${
              darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-500 hover:bg-gray-600"
            }`}
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
