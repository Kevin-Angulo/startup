import React from 'react';
import { NavLink } from 'react-router-dom';

export function ClientDashboard() {
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
            placeholder="DashLink Name..."
            className="input input-bordered w-full max-w-xs"
          />
          <div className="card-actions justify-end">
            <button className="btn">Create</button>
          </div>
        </div>
      </div>

      {/* PLACEHOLDER : DATABASE DYNAMIC DATA OF DASHLINKS THE USER CREATES */}
      <div className="flex flex-col items-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-center my-10 underline">
          My DashLinks
        </h2>
        <ul className="grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-3 gap-5 place-items-center text-lg font-bold">

          <div className="indicator">
            {/* PLACEHOLDER : WEBSOCKET Real Time Notifications of new Posts */}
            <span className="indicator-item badge badge-secondary">12</span>
            <NavLink to="/dashlinkDashboard" className="btn">[dashlink.name]</NavLink>
            </div>

            <div className="indicator">
            {/* PLACEHOLDER : WEBSOCKET Real Time Notifications of new Posts */}
            <span className="indicator-item badge badge-secondary">5</span>
            <NavLink to="/dashlinkDashboard" className="btn">My Dashlink</NavLink>
          </div>

          <div className="indicator">
            {/* PLACEHOLDER : WEBSOCKET Real Time Notifications of new Posts */}
            <span className="indicator-item badge badge-secondary">0</span>
            <NavLink to="/dashlinkDashboard" className="btn">DashLink 3</NavLink>
          </div>

          <div className="indicator">
            {/* PLACEHOLDER : WEBSOCKET Real Time Notifications of new Posts */}
            <span className="indicator-item badge badge-secondary">23</span>
            <NavLink to="/dashlinkDashboard" className="btn">[dashlink.name]</NavLink>
          </div>

          <div className="indicator">
            {/*PLACEHOLDER : WEBSOCKET Real Time Notifications of new Posts */}
            <span className="indicator-item badge badge-secondary">2</span>
            <NavLink to="/dashlinkDashboard" className="btn">Test 123</NavLink>
          </div>
        </ul>
      </div>
    </main>
  );
}