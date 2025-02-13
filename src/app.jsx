import React from "react";

export default function App() {
  return (
    <div>
      {/* <!-- HEADER --> */}
      <header className="flex justify-between items-center bg-base-300 px-10 py-5 max-sm:px-5">
        <div className="flex items-center gap-1">
          <img
            className="max-h-10 max-sm:max-h-6"
            src="assets/icon.png"
            alt="Dash Link Logo"
          />
          <h1 className="text-4xl font-bold max-sm:text-xl">DashLink</h1>
        </div>
        <nav className="font-bold flex gap-4">
          <a href="/clientDashboard.html" className="btn btn-outline btn-sm">
            SIGN UP
          </a>
        </nav>
      </header>

      <main className="items-center px-10 py-5">App Components go here</main>

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
  );
}
