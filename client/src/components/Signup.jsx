import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo.png";

function Signup() {
  return (
    <div className="leading-normal tracking-normal text-white gradient min-h-screen">
      <nav id="header" className="fixed w-full z-30 top-0 text-white gradient">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
          <div className="pl-4 flex items-center">
            <a
              className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
              href="#"
            >
              <img
                id="rectangle"
                src={logo}
                className="fill-current inline w-10 pb-2 mr-2"
              />
              RAIL'S MADA
            </a>
          </div>
        </div>
        <hr className="border-b opacity-25 my-0 py-0" />
      </nav>
      <section className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-center text-white mb-6">Inscription</h1>
          <form>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded text-black"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded text-black"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="confirm-password">
                Confirmation mot de passe
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border rounded text-black"
                required
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-sm text-white">Me souvenir</span>
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Termes et conditions
              </a>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-full px-4 py-2 gradient text-white rounded-lg hover:opacity-80"
              >
                Enregistrer
              </button>
            </div>
            <p className="mt-4 text-center text-white">
              J'ai déja un compte?{" "}
              <Link to="/" className="text-blue-500 hover:underline">
                Connexion
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Signup;