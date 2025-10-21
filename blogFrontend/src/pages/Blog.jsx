import Navbar from "../components/Navbar";
import Header from "../components/Header";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Blog() {
  const navigate = useNavigate();

  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");

async function handleAddBlog(event) {
    event.preventDefault();

    const newBlog = {
        title: blogTitle,
        content: blogContent,
    };

    try {
        const res = await fetch("http://localhost:3000/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBlog),
            credentials: "include",
        });

        if (!res.ok) {
            if (res.status === 401) {
                // Not authenticated, redirect to login
                navigate("/login");
            }
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Blog created:", data);
        navigate("/");

    } catch (err) {
        console.error("Error creating blog:", err.message);
    }

    setBlogTitle("");
    setBlogContent("");
}


  return (
    <>
      <Navbar />
      <Header />
      <div className="max-w-xl mx-auto bg-blue-50 p-6 rounded-xl shadow-md space-y-4 mt-4">
        <h2 className="text-2xl font-bold text-center">✍️ Write a New Blog</h2>
        <form onSubmit={handleAddBlog}>
        <input
          className="w-full p-2 border border-zinc-400 shadow-md rounded-md"
          type="text"
          name="title"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          placeholder="Title of your blog"
        />

        <textarea
          className="w-full p-2 border border-zinc-400 shadow-md rounded-md min-h-[150px]"
          name="content"
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
          placeholder="Write your blog here..."
        />

        <button
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-lg"
          type="submit"
          
        >
          Create Blog
        </button>
        </form>
      </div>
    </>
  );
}

export default Blog;
