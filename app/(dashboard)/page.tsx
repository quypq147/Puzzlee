"use client";

import React from "react";
import Link from "next/link";

function Dashboardpage() {
  return (
    <div>
      <header className="flex ">
        <div className="">Puzzlee</div>
        <nav className="ml-auto">
          <ul className="flex gap-4">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
        <div className="">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </div>
      </header>
      <main></main>
      <footer></footer>
    </div>
  );
}

export default Dashboardpage;
