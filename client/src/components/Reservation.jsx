import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { createVoyageur } from "../services/reservationApi";
import { getCategories } from "../services/admin/categorieApi";
import { getItineraires } from "../services/admin/itineraireApi";
import { getTrainsInItineraire } from "../services/admin/itineraireApi";
import { getCategorieInTrain } from "../services/admin/trainApi";
import "../App.css";
import logo from "../assets/logo.png";
import logobody from "../assets/logobody.png";

function Reservation() {
  const location = useLocation();
  const [datahead, setDatahead] = useState([
    {id: 1, libelle:'Jour'},
    {id: 2, libelle:'Heure'},
    {id: 3, libelle:'Categorie'},
    {id: 4, libelle:'Place'},
    {id: 5, libelle:'Frais'},
  ]);

  function formatTicketNumber(num) {
    return num.toString().padStart(5, '0');
  }

  const numTicket = 1;
  const formattedNumTicket = formatTicketNumber(numTicket);  // '00001'

  const [formData, setFormData] = useState({
    NumTicket: formattedNumTicket,
    emailVoyageur: '',
    nomVoyageur: '',
    dateDepart: '',
    nbPlace: 1,
    codeCategorie: '',
  }); 
  
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    const categoriesData = await getCategories();
    console.log(categoriesData);
    setCategories(categoriesData);
  };

  const [itineraires, setItineraires] = useState([]);
  const fetchItineraires = async () => {
    const itinerairesData = await getItineraires();
    console.log(itinerairesData);
    setItineraires(itinerairesData);
  };

  const [trainInItineraires, setTrainInItineraires] = useState([]);
  const fetchTrainInItineraires = async () => {
    const trainInItinerairesData = await getTrainsInItineraire();
    console.log(trainInItinerairesData);
    setTrainInItineraires(trainInItinerairesData);
  };

  const [categorieInTrain, setCategorieInTrain] = useState([]);
  const fetchCategorieInTrain = async () => {
    const categorieInTrainData = await getCategorieInTrain();
    console.log(categorieInTrainData);
    setCategorieInTrain(categorieInTrainData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      response = await createVoyageur(formData);
      console.log('Réservation envoyée avec succès');
      console.log(formData);
      setFormData(prevData => ({ ...prevData, NumTicket: formatTicketNumber(parseInt(prevData.NumTicket, 10) + 1) }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchItineraires();
    fetchTrainInItineraires();
    fetchCategorieInTrain();
  }, []);

  // Nouvelle logique pour créer des ensembles pour lieuDepart et lieuArrivee
  const uniqueLieuDeparts = new Set(itineraires.map(itineraire => itineraire.lieuDepart));
  const uniqueLieuArrivees = new Set(itineraires.map(itineraire => itineraire.lieuArrivee));


  return (
    <>
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
          <div className="block lg:hidden pr-4">
            <button
              id="nav-toggle"
              className="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
              <svg
                className="fill-current h-6 w-6"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div
            className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-white p-4 lg:p-0 z-20"
            id="nav-content"
          >
            <ul className="list-reset lg:flex justify-end flex-1 items-center">
              <li className="mr-3">
                <Link
                  className={`inline-block py-2 px-4 no-underline ${
                    location.pathname === "/" ? "font-bold" : ""
                  }`}
                  to="/"
                  id="acc"
                >
                  Acceuil
                </Link>
              </li>
              <li className="mr-3">
                <Link
                  className={`inline-block py-2 px-4 no-underline ${
                    location.pathname === "/reservation" ? "font-bold" : ""
                  }`}
                  id="reservation"
                  to="/reservation"
                >
                  Reservation
                </Link>
              </li>
            </ul>
            <button
              id="navAction"
              className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
              Contact
            </button>
          </div>
        </div>
        <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
      </nav>

      {/* Blogs */}
      <div className="mx-auto p-4 mt-28">
        <div className="flex flex-wrap -mx-4">
          {/* Blog1 */}
          <div className="w-full md:w-2/5 px-4 mb-4">
            <div className="neon bg-white p-6 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Réservation
                    </h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="nomVoyageur"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Nom du voyageur
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              type="text"
                              name="nomVoyageur"
                              value={formData.nomVoyageur}
                              id="username"
                              autoComplete="username"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="Votre Nom"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="emailVoyageur"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="emailVoyageur"
                            value={formData.emailVoyageur}
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                            placeholder="votre_adresse@exemple.com"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="dateDepart"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Date
                        </label>
                        <div className="mt-2">
                          <input
                            id="date"
                            type="date"
                            name="dateDepart"
                            value={formData.dateDepart}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <br />
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="codeCategorie"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                        Code catégorie
                        </label>
                        <div className="mt-2">
                          <select
                            id="codeCategorie"
                            name="codeCategorie"
                            value={formData.codeCategorie}
                            autoComplete="categorie-name"
                            className="h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            onChange={handleChange}
                          ><option value=""></option>
                            {categories.length !== 0 ? (
                              categories.map((categorie) => (
                                <option
                                  key={categorie.codeCategorie}
                                  value={categorie.codeCategorie}
                                >
                                  {categorie.codeCategorie}
                                </option>
                              ))
                            ) : (
                              <option value=""></option>
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="nbPlace"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Nombre Place
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="nbPlace"
                            value={formData.nbPlace}
                            id="nombrePlace"
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 pl-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Reserver
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Blog2 */}
          <div className="w-full md:w-3/5 px-4 mb-4">
            <div className="neon bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">
                Voyager c'est vivre
              </h2>
              <div className="flex justify-center mb-2">
                <img src={logobody} alt="Logobody" className="w-32 h-32" />
              </div>
              <div className="flex flex-nowrap -mx-4 w-full">
                <div className="sm:w-1/2 mb-4 px-4">
                  <label
                    htmlFor="lieuDepart"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Depart
                  </label>
                  <select 
                    name="lieuDepart" 
                    id="depart"
                    className="h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >  
                    <option value=""></option>
                  {Array.from(uniqueLieuDeparts).map((lieuDepart, index) => (
                    <option key={index} value={lieuDepart}>
                      {lieuDepart}
                    </option>
                  ))}
                  </select>
                </div>
                <div className="sm:w-1/2 mb-4 px-4">
                  <label
                    htmlFor="lieuArrivee"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Destination
                  </label>
                  <select 
                    name="lieuArrivee" 
                    id="depart"
                    className="h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >  
                    <option value=""></option>
                  {Array.from(uniqueLieuArrivees).map((lieuArrivee, index) => (
                    <option key={index} value={lieuArrivee}>
                      {lieuArrivee}
                    </option>
                  ))}
                  </select>
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    {datahead.map((item) => (
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400" key={item.id}>{item.libelle}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


      <footer className="bg-white">
        <div className="container mx-auto px-8">
          <div className="w-full flex flex-col md:flex-row py-6">
            <div className="flex-1 mb-6 text-black">
              <a
                className="text-purple-900 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
                href="#"
              >
                <img src={logobody} className="fill-current inline w-10 pb-4" />
                RAIL'S MADA
              </a>
            </div>
            <div className="flex-1">
              <p className="uppercase text-gray-500 md:mb-6">Links</p>
              <ul className="list-reset mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-pink-500"
                  >
                    FAQ
                  </a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-pink-500"
                  >
                    Help
                  </a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-pink-500"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <p className="uppercase text-gray-500 md:mb-6">Legal</p>
              <ul className="list-reset mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-pink-500"
                  >
                    Terms
                  </a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-pink-500"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <p className="uppercase text-gray-500 md:mb-6">Social</p>
              <ul className="list-reset mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-pink-500"
                  >
                    Facebook
                  </a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-pink-500"
                  >
                    Linkedin
                  </a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-pink-500"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <p className="uppercase text-gray-500 md:mb-6">Company</p>
              <ul className="list-reset mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-pink-500"
                  >
                    Official Blog
                  </a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-pink-500"
                  >
                    About Us
                  </a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-pink-500"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Reservation;