import React, { useState, useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";

export function DashlinkDashboard() {
  //dynamic dashlink name from location state
  const location = useLocation();
  const dashlinkName = location.state?.name || "Your DashLink";

  //initial posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "404 Error",
      date: "September 30th 2024",
      message:
        "Your website keeps returning a 404 error when I try to access the contact page. I Think there is some time of to error going on or the contact page is not properly set up.",
      upvotes: 13,
      resolved: false,
    },
    {
      id: 2,
      title: "Dark Mode Request",
      date: "Oct 1st 2024",
      message:
        "I would love to see a dark mode version or toggle button for your website. I think that would be a great ui feature!",
      upvotes: 9,
      resolved: false,
    },
  ]);

  //onClick Function handlers
  function handleUpvote(id) {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p))
    );
  }

  function handleDelete(id) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  function handleResolve(id) {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, resolved: true } : p))
    );
  }

  //simulate updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPosts((prevPosts) => {
        const index = Math.floor(Math.random() * prevPosts.length);
        const updatedPosts = [...prevPosts];
        updatedPosts[index] = {
          ...updatedPosts[index],
          upvotes: updatedPosts[index].upvotes + 1,
        };
        return updatedPosts;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  //copy link button functionality
  const copyLinkToClipboard = () => {
    const fakePublicUrl = `https://startup.pro-dash-link.click/public/12345`; // Replace 12345 with a dynamic ID in the future
    navigator.clipboard
      .writeText(fakePublicUrl)
      .then(() => alert("Link copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  //download qr code functionality
  const downloadQRCode = () => {
    const qrImageUrl =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://startup.pro-dash-link.click/public/12345";
    const link = document.createElement("a");
    link.href = qrImageUrl;
    link.download = "dashlink-qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="px-10 py-5">
      <nav className="font-bold flex gap-4 mb-7">
        <NavLink to="/clientDashboard" className="btn btn-outline btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path
              fill-rule="evenodd"
              d="M12.5 9.75A2.75 2.75 0 0 0 9.75 7H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 1.06L4.56 5.5h5.19a4.25 4.25 0 0 1 0 8.5h-1a.75.75 0 0 1 0-1.5h1a2.75 2.75 0 0 0 2.75-2.75Z"
              clip-rule="evenodd"
            />
          </svg>
          Back
        </NavLink>
      </nav>
      {/* <!--PLACEHOLDER : DYNAMIC DATA FROM DATABASE OF PUBLIC FEEDBACK POSTS TIED TO THE USER'S DASHLINK--> */}
      <h2 className="text-4xl font-bold text-center mb-5">
        {dashlinkName} Feedback Posts
      </h2>
      {/* <!-- QR CODE & Link Buttons --> */}
      <div className="flex mx-auto max-w-sm justify-evenly mb-10">
        <button
          className="btn btn-outline btn-secondary font-bold"
          onClick={copyLinkToClipboard}
        >
          Copy
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path
              fill-rule="evenodd"
              d="M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 0 1 1.251.827 2 2 0 0 0 3.085 2.514l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 5.396 4.402.75.75 0 0 1-1.251-.827 2 2 0 0 0-3.085-2.514l-2 2a2 2 0 0 0 0 2.828.75.75 0 0 1 0 1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          className="btn btn-outline btn-ghost font-bold"
          onClick={downloadQRCode}
        >
          Download
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path d="M4.75 4.25a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z" />
            <path
              fill-rule="evenodd"
              d="M2 3.5A1.5 1.5 0 0 1 3.5 2H6a1.5 1.5 0 0 1 1.5 1.5V6A1.5 1.5 0 0 1 6 7.5H3.5A1.5 1.5 0 0 1 2 6V3.5Zm1.5 0H6V6H3.5V3.5Z"
              clip-rule="evenodd"
            />
            <path d="M4.25 11.25a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Z" />
            <path
              fill-rule="evenodd"
              d="M2 10a1.5 1.5 0 0 1 1.5-1.5H6A1.5 1.5 0 0 1 7.5 10v2.5A1.5 1.5 0 0 1 6 14H3.5A1.5 1.5 0 0 1 2 12.5V10Zm1.5 2.5V10H6v2.5H3.5Z"
              clip-rule="evenodd"
            />
            <path d="M11.25 4.25a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z" />
            <path
              fill-rule="evenodd"
              d="M10 2a1.5 1.5 0 0 0-1.5 1.5V6A1.5 1.5 0 0 0 10 7.5h2.5A1.5 1.5 0 0 0 14 6V3.5A1.5 1.5 0 0 0 12.5 2H10Zm2.5 1.5H10V6h2.5V3.5Z"
              clip-rule="evenodd"
            />
            <path d="M8.5 9.417a.917.917 0 1 1 1.833 0 .917.917 0 0 1-1.833 0ZM8.5 13.083a.917.917 0 1 1 1.833 0 .917.917 0 0 1-1.833 0ZM13.083 8.5a.917.917 0 1 0 0 1.833.917.917 0 0 0 0-1.833ZM12.166 13.084a.917.917 0 1 1 1.833 0 .917.917 0 0 1-1.833 0ZM11.25 10.333a.917.917 0 1 0 0 1.833.917.917 0 0 0 0-1.833Z" />
          </svg>
        </button>
        <NavLink to="/publicLink" className="btn btn-outline btn-accent mb-5">
          Public Page
        </NavLink>
      </div>

      {/* <!-- LIST OF POSTS --> */}
      <ul className="max-sm:text-sm">
        {posts
          .sort((a, b) => b.upvotes - a.upvotes)
          .map((post) => (
            <li
              key={post.id}
              className="card bg-neutral text-neutral-content max-w-xl mx-auto mb-7"
            >
              <div className="card-body items-left text-left">
                <div className="flex justify-between">
                  <h2 className="card-title">
                    {post.resolved ? <s>{post.title}</s> : post.title}
                  </h2>
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
                <p>{post.resolved ? <s>{post.date}</s> : post.date}</p>
                <p>{post.resolved ? <s>{post.message}</s> : post.message}</p>
                <div className="card-actions justify-between mt-5">
                  <button
                    className="btn btn-primary btn-outline"
                    onClick={() => handleResolve(post.id)}
                  >
                    Mark as Resolved
                  </button>
                  <button
                    className="btn btn-error btn-outline"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </main>
  );
}
