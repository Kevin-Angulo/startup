import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import { ClientDashboard } from "./clientDashboard/clientDashboard";
import { DashlinkDashboard } from "./dashlinkDashboard/dashlinkDashboard";
import { Login } from "./login/login";
import { PublicLink } from "./publicLink/publicLink";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem("userEmail");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();

    window.addEventListener("userUpdated", checkUser);

    return () => {
      window.removeEventListener("userUpdated", checkUser);
    };
  }, []);

  return (
    <BrowserRouter>
      <div>
        {/* <!-- HEADER --> */}
        <header className="flex justify-between items-center bg-base-300 px-10 py-5 max-sm:px-5">
          <NavLink to="/" className="flex items-center gap-1">
            <img
              className="max-h-10 max-sm:max-h-6"
              src="icon.png"
              alt="Dash Link Logo"
            />
            <h1 className="text-4xl font-bold max-sm:text-xl">DashLink</h1>
          </NavLink>
          <nav className="font-bold flex gap-4">
            {user ? (
              <NavLink to="clientDashboard" className="btn btn-outline btn-sm">
                DASHBORD
              </NavLink>
            ) : null}
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/clientDashboard" element={<ClientDashboard />} />
          <Route path="/publicLink" element={<PublicLink />} />
          <Route path="/dashlinkDashboard" element={<DashlinkDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="bg-base-300 opacity-55 mt-10">
          <h2 className="text-9xl font-extrabold text-center py-12 max-sm:text-6xl">
            DashLink
          </h2>
          <p className="text-sm font-light text-center">
            CS-260 Project by : Kevin Angulo
          </p>

          <a
            className="text-md font-semibold text-center btn btn-link flex items-center"
            href="https://github.com/Kevin-Angulo/startup"
          >
            GitHub Source
          </a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="py-12 bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}
