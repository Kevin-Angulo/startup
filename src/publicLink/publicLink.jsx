import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export function PublicLink() {
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [isHuman, setIsHuman] = useState(false);

  //fetch existing dashlinks with api/dashboard/list
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/post/list");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    }

    fetchPosts();
  }, []);

  //Handle Functions for New Post and Upvote
  async function handleSubmit(e) {
    e.preventDefault();

    //Captcha Validation
    if (!isHuman) {
      alert("Please confirm you are not a robot.");
      return;
    }

    const newPost = {
      dashlinkName: "Public Link",
      title: postTitle,
      message: postBody,
    };

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (res.ok) {
        const createdPost = await res.json();
        setPosts((prev) => [createdPost, ...prev]);
        setPostTitle("");
        setPostBody("");
      } else {
        alert("Failed to submit feedback");
      }
    } catch (err) {
      console.error("Error submitting post:", err);
    }
  }

  async function handleUpvote(id) {
    const res = await fetch(`/api/post/upvote/${id}`, {
      method: "PUT",
    });

    if (res.ok) {
      const updatedPost = await res.json();
      setPosts((prev) =>
        prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      );
    } else {
      alert("Failed to upvote");
    }
  }

  return (
    <main className="px-10 py-5">
      {/* <!-- Hero Title --> */}
      <h2 className="text-4xl font-bold text-center max-sm:text-2xl">
        Leave Feedback
      </h2>
      <NavLink
        to="/"
        className="flex justify-center text-sm font-bold text-center pb-10 btn btn-link text-neutral"
      >
        Powered by <span className="text-primary">DashLink</span>
      </NavLink>

      {/* <!--PLACEHOLDER : API POST CALL *CREATE NEW DASHLINK--> */}
      <div className="card bg-primary text-primary-content max-w-xl m-auto mb-10">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="card-title">New Feedback Post</h2>
          <input
            type="text"
            placeholder="Title..."
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required
            className="input input-bordered w-full max-w-xs mb-4"
          />
          <input
            type="text"
            placeholder="Feedback..."
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
            required
            className="input input-bordered w-full max-w-s"
          />
          {/* <!--PLACEHOLDER : API POST CALL *CREATE NEW FEEDBACK POST--> */}

          <div className="flex flex-col card-actions justify-start mt-5">
            <div className="flex items-center gap-3 mb-3">
              <p className="font-bold">I am a robot</p>
              <input
                type="checkbox"
                className="toggle"
                checked={!isHuman}
                onChange={() => setIsHuman(!isHuman)}
              />
            </div>
            <button className="btn">Send Feedback</button>
          </div>
        </form>
      </div>

      {/* <!--PLACEHOLDER : DATABASE DYNAMIC DATA OF ALL FEEDBACK POSTS--> */}
      <h2 className="text-4xl font-bold text-center mb-5 max-sm:text-2xl">
        Past Feedback Posts
      </h2>
      {/* <!-- LIST OF POSTS --> */}
      <ul className="max-sm:text-sm">
        {posts.map((post) => (
          <li
            key={post.id}
            className="card bg-neutral text-neutral-content max-w-xl mx-auto mb-7"
          >
            <div className="card-body items-left text-left">
              <div className="flex justify-between">
                <h2 className="card-title">{post.title}</h2>
                <div className="indicator">
                  <span className="indicator-item badge badge-secondary">
                    {post.upvotes}
                  </span>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleUpvote(post.id)}
                  >
                    Up Vote ⬆️
                  </button>
                </div>
              </div>
              <p className="font-bold">{post.date}</p>
              <p>{post.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
