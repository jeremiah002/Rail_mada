import React, { useState } from "react";
import "../App.css";
import logo from "../assets/logo.png";
import { auth } from "../services/authApi";
import { useNavigate  } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Form Data:', formData);
      setFormData({ email: '', password: '' });
      try {
        const response = await auth(formData);
        if (response.status === 200) {
            navigate("/admin");
        }
      } catch (error) {
        console.error('Authentication failed:', error);
      }
    };

    return (
        <div className="leading-normal tracking-normal text-white gradient min-h-screen flex flex-col">
            <nav id="header" className="fixed w-full z-30 top-0 text-white gradient">
                <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
                    <div className="pl-4 flex items-center">
                        <a className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
                            <img id="rectangle" src={logo} className="fill-current inline w-10 pb-2 mr-2" />
                            RAIL'S MADA
                        </a>
                    </div>
                    <div className="block lg:hidden pr-4">
                        <button id="nav-toggle" className="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                            <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <hr className="border-b opacity-25 my-0 py-0" />
            </nav>
            <form method="POST" action="#" onSubmit={handleSubmit} className="flex justify-center flex-grow items-center">
                <div className="px-10 py-10 rounded-xl w-screen max-w-sm bg-gray-800">
                    <div className="space-y-7">
                        <h1 className="text-center mb-6 text-2xl font-semibold text-white">Se connecter</h1>
                        <div className="flex items-center border-2 py-2 px-3 rounded-lg mx-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input className="bg-transparent pl-2 outline-none border-none w-full" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-lg mx-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <input className="bg-transparent pl-2 outline-none border-none w-full" type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="flex justify-start pl-5 items-center mt-1">
                        <a href="#" className="text-xs text-white">mot de passe oublié?</a>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button type="submit" className="mx-4 mt-6 neoni hover:neonih h-10 w-40 rounded-md bg-[#debb3b] font-light text-white text-lg tracking-wide transition duration-1000">Connexion</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;