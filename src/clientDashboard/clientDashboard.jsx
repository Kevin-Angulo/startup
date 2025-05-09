import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export function ClientDashboard() {
  const [dashlinkName, setDashlinkName] = React.useState("");
  const [dashlinks, setDashlinks] = React.useState([]);

  ///fetch existing dashlinks with api/dashlinks/list
  useEffect(() => {
    async function getDashlinks() {
      try {
        const res = await fetch("/api/dashlink/list");
        if (res.ok) {
          const data = await res.json();
          setDashlinks(data);
        } else {
          console.error("Failed to fetch dashlinks");
        }
      } catch (error) {
        console.error("Error fetching dashlinks:", error);
      }
    }
  }, []);

  //handler function for creating new dashlink
  const createDashLink = async () => {
    if (!dashlinkName) return;

    try {
      const res = await fetch("/api/dashlink/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: dashlinkName }),
      });

      if (res.ok) {
        const created = await res.json();
        setDashlinks((prev) => [...prev, created]);
        setDashlinkName("");
      } else {
        alert("Failed to create dashlink");
      }
    } catch (error) {
      console.error("Error creating dashlink:", error);
    }
  };

  return (
    <main className="px-10 py-5">
      {/* Hero Title  */}
      <h2 className="text-4xl font-bold text-center pb-10 max-sm:text-3xl">
        DashLink Admin Dashboard
      </h2>
      {/* PLACEHOLDER : API POST CALL *CREATE NEW DASHLINK */}
      <div className="card bg-primary text-primary-content max-w-96 m-auto">
        <div className="card-body">
          <h2 className="card-title">New DashLink</h2>
          <input
            type="text"
            value={dashlinkName.trim()}
            onChange={(e) => setDashlinkName(e.target.value)}
            placeholder="DashLink Name..."
            className="input input-bordered w-full max-w-xs"
          />
          <div className="card-actions justify-end">
            <button className="btn" onClick={createDashLink}>
              Create
            </button>
          </div>
        </div>
      </div>

      {/* PLACEHOLDER : DATABASE DYNAMIC DATA OF DASHLINKS THE USER CREATES */}
      <div className="flex flex-col items-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-center my-10 underline">
          My DashLinks
        </h2>
        {dashlinks.length === 0 ? (
          <p>No Dashlinks Created....</p>
        ) : (
          <ul className="grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-3 gap-5 place-items-center text-lg font-bold">
            {dashlinks.map((dashlink) => (
              <div key={dashlinkName.id} className="indicator">
                {/* PLACEHOLDER : WEBSOCKET Real Time Notifications of new Posts */}
                <span className="indicator-item badge badge-secondary">
                  {dashlink.unreadCount}
                </span>
                <NavLink
                  to="/dashlinkDashboard"
                  state={{ name: dashlink.name }}
                  className="btn"
                >
                  {dashlink.name}
                </NavLink>
              </div>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
