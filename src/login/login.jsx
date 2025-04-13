import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //HANDLE LOGIN API CALL
  async function handleLogin(e) {
    e.preventDefault();

    //check for both email and password
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // make api call to authenticate user
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
      credentials: "include",
    });

    //check response status
    if (response.ok) {
      navigate("/clientDashboard");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  }

  //HANDLE "CREATE USER" API CALL
  async function handleRegister(e) {
    e.preventDefault();

    //check for both email and password
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // make api call to create new user
    const response = await fetch("/api/auth/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
      credentials: "include",
    });

    //check response status
    if (response.ok) {
      navigate("/clientDashboard");
    } else if (response.status === 409) {
      alert("User already exists. Please log in.");
    } else {
      alert("User creation failed. Please try again.");
    }
  }

  return (
    <main className="items-center px-10 py-5">
      {/* Hero Title */}
      <h2 className="text-center text-primary text-6xl font-bold py-10 max-sm:text-3xl max-sm:py-0 max-sm:mb-4">
        Collect Feedback from your Clients!
      </h2>

      {/* PLACEHOLDER : USER AUTHENTICATION */}
      {/* How it Works & Sign Up Form */}
      <form className="mx-auto card bg-neutral shadow-xl max-w-2xl max-md:w-full">
        <div className="card-body text-primary">
          <h2 className="card-title text-base-100">SIGN IN</h2>
          <label className="input input-bordered flex items-center gap-2 w-full">
            <input
              type="text"
              className="w-full bg-base-100"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="w-full bg-base-100"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="card-actions justify-between mt-4">
            <button className="btn btn-sm btn-primary" onClick={handleLogin}>
              SIGN IN
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={handleRegister}
            >
              SIGN UP
            </button>
          </div>
        </div>
      </form>

      {/* Div of "How it Works and Watch Demo" [not for mobile] */}
      <div className="card card-side bg-base-300 shadow-xl mt-10 max-w-4xl mx-auto max-md:hidden">
        <figure className="w-96">
          <img src="styled_appPreview.png" alt="DashLink Demo Image" />
        </figure>
        {/* Div of "How it Works" */}
        <div className="card-body flex flex-col justify-between">
          {/* How It Works Section */}
          <section>
            <h3 className="text-5xl font-semibold mb-3 max-sm:text-center max-sm:text-3xl">
              How it Works 🤔
            </h3>
            <div className="text-2xl font-bold flex flex-col gap-2 max-sm:text-center max-sm:text-lg">
              <p className="text-primary">1️⃣ Create a Dash Link</p>
              <p>2️⃣ Share the Dash Link with your Clients</p>
              <p className="text-primary">3️⃣ Collect Feedback</p>
              <p>4️⃣ Improve your business</p>
            </div>
          </section>
          {/* Watch Demo Div */}
          <div className="card-actions flex justify-between">
            <div>
              <h2 className="card-title">See how DashLink works in action!</h2>
              <p>Click to watch on our Demo.</p>
            </div>
            <button className="btn btn-accent">Watch</button>
          </div>
        </div>
      </div>

      {/* Div of "How it Works and Watch Demo" [for mobile] */}
      <div className="card bg-base-300 shadow-xl mt-10 w-full mx-auto lg:hidden md:hidden">
        {/* Div of "How it Works" */}
        <div className="card-body flex flex-col justify-between">
          {/* How It Works Section */}
          <section>
            <h3 className="font-semibold mb-3 text-center text-3xl">
              How it Works 🤔
            </h3>
            <div className="text-lg font-bold flex flex-col gap-2">
              <p className="text-primary">1️⃣ Create a Dash Link</p>
              <p>2️⃣ Share the Dash Link with your Clients</p>
              <p className="text-primary">3️⃣ Collect Feedback</p>
              <p>4️⃣ Improve your business</p>
            </div>
          </section>
          {/* Watch Demo Div */}
          <div className="card-actions flex justify-between pt-7">
            <div>
              <h2 className="card-title text-neutral">
                See DashLink work in action!
              </h2>
              <p>Click to watch on our Demo.</p>
            </div>
            <button className="btn btn-accent btn-sm">Watch</button>
          </div>
        </div>
      </div>
    </main>
  );
}
