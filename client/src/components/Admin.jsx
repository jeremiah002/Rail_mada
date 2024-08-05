import React, { useEffect, useState } from "react";
import "../App.css";
import logo from "../assets/logo.png";
import {
  createItineraire,
  getItineraires,
  deleteItineraire,
  editItineraire
} from "../services/admin/itineraireApi";
import { createTrain, getTrains, editTrain, deleteTrain } from "../services/admin/trainApi";
import { createCategorie, deleteCategorie, editCategorie, getCategories } from "../services/admin/categorieApi";
import { getVoyageurs } from "../services/reservationApi";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  // Itineraire controller

  const [formDataItineraire, setFormDataItineraire] = useState({
    lieuDepart: "",
    lieuArrivee: "",
    jourDepart: "",
    heureDepart: "",
    codeItineraire: "",
  });

  const resetFormDataItineraire = () => {
    setFormDataItineraire({
      lieuDepart: "",
      lieuArrivee: "",
      jourDepart: "",
      heureDepart: "",
      codeItineraire: "",
    });
  };

  const handleChangeItineraire = (e) => {
    setFormDataItineraire({
      ...formDataItineraire,
      [e.target.name]: e.target.value
    });
  };

  const [isEditing, setIsEditing] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const editItineraryForm = (itineraire, e) => {
    e.preventDefault();
    setIsEditing(true);
    setSelectedItinerary(itineraire);
    setFormDataItineraire({
      lieuDepart: itineraire.lieuDepart,
      lieuArrivee: itineraire.lieuArrivee,
      jourDepart: itineraire.jourDepart,
      heureDepart: itineraire.heureDepart,
      codeItineraire: itineraire.codeItineraire,
    });
  };
 

  const [itineraires, setItineraires] = useState([]);
  const fetchItineraires = async () => {
    const itinerairesData = await getItineraires();
    console.log(itinerairesData);
    setItineraires(itinerairesData);
  };

  const deleteCurrentItinerary = async () => {
    try {
      const response = await deleteItineraire(selectedItinerary.codeItineraire);
      if (response.status === 200) {
        console.log(response.data);
        fetchItineraires(); // maj
      }
    } catch (error) {
      console.error(error);
    }
  };

  const itineraireSubmit = async (e) => {
    e.preventDefault();
   
    try {
      let response;
      if (isEditing) {
        response = await editItineraire(selectedItinerary.codeItineraire, formDataItineraire);
        console.log(formDataItineraire);
      } else {
        response = await createItineraire(formDataItineraire);
      }
      if (response.status === 200) {
        setFormDataItineraire({
          lieuDepart: "",
          lieuArrivee: "",
          jourDepart: "",
          heureDepart: "",
          codeItineraire: "",
        });
      console.log(response.data);
      setIsEditing(false); // Réinitialiser le mode d'édition après la soumission
      fetchItineraires(); // Récupérer les données mises à jour
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Train

  const [formDataTrain, setFormDataTrain] = useState({
    immatriculation: "",
    codeItineraire: "",
  });

  const resetFormDataTrain = () => {
    setFormDataTrain({
      immatriculation: "",
      codeItineraire: "",
    });
  };

  const [trains, setTrains] = useState([]);
  const fetchTrains = async () => {
    const trainsData = await getTrains();
    console.log(trainsData);
    setTrains(trainsData);
  };

  const handleChangeTrain = (e) => {
    setFormDataTrain({ ...formDataTrain, [e.target.name]: e.target.value });
  };

  const [isEditingTrain, setIsEditingTrain] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const editTrainForm = (train) => {
    setIsEditingTrain(true);
    setSelectedTrain(train);
    setFormDataTrain({
      immatriculation: train.immatriculation,
      codeItineraire: train.codeItineraire
    });
    handleChangeTrain;
  };

  const trainSubmit = async (e) => {
    e.preventDefault();
   
    try {
      let response;
      if (isEditingTrain) {
        response = await editTrain(selectedTrain.immatriculation, formDataTrain);
        console.log(formDataTrain);
      } else {
        response = await createTrain(formDataTrain);
      }
      if (response.status === 200) {
        setFormDataTrain({
          immatriculation: "",
          codeItineraire: ""
        });
      console.log(response.data);
      setIsEditingTrain(false); // Réinitialiser le mode d'édition après la soumission
      fetchTrains(); // Récupérer les données mises à jour
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCurrentTrain = async () => {
    try {
      const response = await deleteTrain(selectedTrain.immatriculation);
      if (response.status === 200) {
        console.log(response.data);
        setIsEditingTrain(false); // Sortir du mode d'édition après suppression
        fetchTrains(); // maj
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Categorie

  const [formDataCategorie, setFormDataCategorie] = useState({
    codeCategorie: "",
    libelleCategorie: "",
    nbPlaceSupporte: 1,
    frais: 0,
    immatriculation: "",
  });
  
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    const categoriesData = await getCategories();
    console.log(categoriesData);
    setCategories(categoriesData);
  };

  const handleChangeCategorie = (e) => {
    setFormDataCategorie({
      ...formDataCategorie,
      [e.target.name]: e.target.value,
    });
  };

  const resetFormDataCategorie = () => {
    setFormDataCategorie({
      codeCategorie: "",
      libelleCategorie: "",
      nbPlaceSupporte: "",
      frais: "",
      immatriculation: "",
    });
  };

  const [isEditingCategorie, setIsEditingCategorie] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState(null);
  const editCategorieForm = (categorie, e) => { // Ajoutez e comme paramètre
    e.preventDefault();
    setIsEditingCategorie(true);
    setSelectedCategorie(categorie);
    setFormDataCategorie({
      codeCategorie: categorie.codeCategorie,
      libelleCategorie: categorie.libelleCategorie,
      nbPlaceSupporte: categorie.nbPlaceSupporte,
      frais: categorie.frais,
      immatriculation: categorie.immatriculation,
    });
  };

  const categorieSubmit = async (e) => {
    e.preventDefault();
   
    try {
      let response;
      if (isEditingCategorie) {
        response = await editCategorie(selectedCategorie.codeCategorie, formDataCategorie);
        console.log(formDataCategorie);
      } else {
        response = await createCategorie(formDataCategorie);
      }
      if (response.status === 200) {
        setFormDataCategorie({
          codeCategorie: "",
          libelleCategorie: "",
          nbPlaceSupporte: "",
          frais: "",
          immatriculation: "",
        });
      console.log(response.data);
      setIsEditingCategorie(false); // Réinitialiser le mode d'édition après la soumission
      fetchCategories(); // Récupérer les données mises à jour
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCurrentCategorie = async () => {
    try {
      const response = await deleteCategorie(selectedCategorie.codeCategorie);
      if (response.status === 200) {
        console.log(response.data);
        setIsEditingCategorie(false); // Sortir du mode d'édition après suppression
        fetchCategories(); // maj
      }
    } catch (error) {
      console.error(error);
    }
  };


  // Voyageur

  const [formDataVoyageur, setFormDataVoyageur] = useState({
    numTicket: "",
    nomVoyageur: "",
    emailVoyageur: "",
    dateDepart: "",
    nbPlace: 1,
    codeCategorie: "",
  });

  const [voyageurs, setVoyageurs] = useState([]);
  const fetchVoyageurs = async () => {
    const voyageursData = await getVoyageurs();
    console.log(voyageursData);
    setVoyageurs(voyageursData);
  };
  
  useEffect(() => {
    fetchItineraires();
    fetchCategories();
    fetchVoyageurs();
    fetchTrains();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/admin/login");
  };

  return (
    <div>
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
                className="fill-current inline w-10 pb-2"
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
            className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
            id="nav-content"
          >
            <ul className="list-reset lg:flex justify-end flex-1 items-center">
              <li className="mr-3">
                <a
                  className="inline-block py-2 px-4 text-white font-bold no-underline"
                  href="#"
                  id="acc"
                >
                  Admin
                </a>
              </li>
            </ul>
            <button
              id="navAction"
              onClick={handleLogout}
              className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
              Déconnecter
            </button>
          </div>
        </div>
        <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
      </nav>
      <div className="mx-auto p-4 mt-28">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-0">
            <div style={{height: '340px'}} className="neon bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-center font-semibold leading-7 text-gray-900">
                Train
              </h2>
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                    >
                      Immatriculation
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                    >
                      Itinéraire
                    </th>
                    <th scope="col" className="p-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {trains.length !== 0 ? (
                    trains.map((train) => (
                      <tr
                        key={train.immatriculation}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                          {train.immatriculation}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white text-center">
                          {train.codeItineraire}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            className="text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => editTrainForm(train)}
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td
                        colSpan="3"
                        className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                      >
                        AUCUN TRAIN
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div style={{height: '550px'}} className="neon bg-white p-6 rounded-lg shadow-lg mt-12 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-center font-semibold leading-7 text-gray-900">
                Catégorie
              </h2>
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                  <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                    >
                      Code Categorie
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                    >
                      Libelle
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                    >
                      Immatriculation
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                    >
                      Nb Place
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                    >
                      Frais
                    </th>
                    <th scope="col" className="p-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {categories.length !== 0 ? (
                    categories.map((categorie) => (
                      <tr
                        key={categorie.codeCategorie}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                          {categorie.codeCategorie}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                          {categorie.libelleCategorie}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white text-center">
                          {categorie.immatriculation}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                          {categorie.nbPlaceSupporte}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                          {categorie.frais}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            className="text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={(e) => editCategorieForm(categorie, e)}
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td
                        colSpan="5"
                        className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                      >
                        AUCUN CATEGORIE
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div style={{height: '490px'}} className="neon bg-white p-6 rounded-lg shadow-lg mt-12 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-center font-semibold leading-7 text-gray-900">
                Itinéraire
              </h2>
              <table className="w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                    >
                      Départ
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                    >
                      Déstination
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                    >
                      Code Itinéraire
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                    >
                      Jour
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                    >
                      Heure
                    </th>
                    <th scope="col" className="p-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {itineraires.length !== 0 ? (
                    itineraires.map((itineraire) => (
                      <tr
                        key={itineraire.codeItineraire}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                          {itineraire.lieuDepart}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white text-center">
                          {itineraire.lieuArrivee}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                          {itineraire.codeItineraire}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                          {itineraire.jourDepart}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                          {itineraire.heureDepart}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            className="text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={(e) => editItineraryForm(itineraire, e)}
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td
                        colSpan="6"
                        className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                      >
                        AUCUN ITINERAIRE
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <div className="neon bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-12">
                <form onSubmit={trainSubmit}>
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Train
                    </h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="immatriculation"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Immatriculation
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                            <input
                              type="text"
                              name="immatriculation"
                              value={formDataTrain.immatriculation}
                              id="immatriculation"
                              autoComplete="immatriculation"
                              className="block w-full border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="Immatriculation du Train"
                              onChange={handleChangeTrain}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="itineraire"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Itinéraire
                        </label>
                        <div className="mt-2">
                          <select
                            id="itineraire"
                            name="codeItineraire"
                            value={formDataTrain.codeItineraire}
                            autoComplete="itineraire-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={handleChangeTrain}
                          >
                            {itineraires.length !== 0 ? (
                              itineraires.map((itineraire) => (
                                <option
                                  key={itineraire.codeItineraire}
                                  value={itineraire.codeItineraire}
                                >
                                  {itineraire.codeItineraire}
                                </option>
                              ))
                            ) : (
                              <option value=""></option>
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                      onClick={() => {
                        setIsEditingTrain(false);
                        resetFormDataTrain();
                      }}
                    >
                      Annuler
                    </button>
                    {isEditingTrain && (
                      <button type="button" 
                      onClick={() => {
                        setIsEditingTrain(false);
                        deleteCurrentTrain(selectedTrain.immatriculation);
                        resetFormDataTrain();
                      }}
                      >
                        Supprimer
                      </button>
                    )}
                    <button
                      type="submit"
                      className="rounded-md gradient px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {isEditingTrain ? "Modifier" : "Ajouter"}
                    </button>
                  </div>
                </form>


                <form onSubmit={categorieSubmit}>
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Catégorie
                    </h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="sm:col-span-4">
                        <label
                          htmlFor="classe"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Code Categorie
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              type="text"
                              name="codeCategorie"
                              value={formDataCategorie.codeCategorie}
                              id="codeCategorie"
                              autoComplete="codeCategorie"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="Code Categorie"
                              onChange={handleChangeCategorie}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="classe"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Libelle classe
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              type="text"
                              name="libelleCategorie"
                              value={formDataCategorie.libelleCategorie}
                              id="libelleCategorie"
                              autoComplete="classe"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="Libelle Classe"
                              onChange={handleChangeCategorie}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="immatriculation"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Immatriculation
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <select
                            id="immatriculation"
                            name="immatriculation"
                            value={formDataCategorie.immatriculation}
                            autoComplete="immatriculation"
                            className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={handleChangeCategorie}
                          ><option value=""></option>
                            {trains.length !== 0 ? (
                              trains.map((train) => (
                                <option
                                  key={train.immatriculation}
                                  value={train.immatriculation}
                                >
                                  {train.immatriculation}
                                </option>
                              ))
                            ) : (
                              <option value=""></option>
                            )}
                          </select>
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="nbPlace"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Nombre Place
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="nbPlaceSupporte"
                            value={formDataCategorie.nbPlaceSupporte}
                            id="nbPlaceSupporte"
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 pl-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={handleChangeCategorie}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="frais"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Frais
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="frais"
                            value={formDataCategorie.frais}
                            id="frais"
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 pl-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Ariary"
                            onChange={handleChangeCategorie}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                      onClick={() => {
                        setIsEditingCategorie(false);
                        resetFormDataCategorie();
                      }}
                    >
                      Annuler
                    </button>
                    {isEditingCategorie && (
                      <button type="button" 
                      onClick={() => {
                        setIsEditingCategorie(false);
                        deleteCurrentCategorie(selectedCategorie.codeCategorie);
                        resetFormDataCategorie();
                      }}
                      >
                        Supprimer
                      </button>
                    )}
                    <button
                      type="submit"
                      className="rounded-md gradient px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {isEditingCategorie ? "Modifier" : "Ajouter"}
                    </button>
                  </div>
                </form>

                <form onSubmit={itineraireSubmit}>
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Itinéraire
                    </h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="depart"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Départ
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="lieuDepart"
                            value={formDataItineraire.lieuDepart}
                            id="depart"
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 pl-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="lieu de depart"
                            onChange={handleChangeItineraire}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="destination"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Destination
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="lieuArrivee"
                            value={formDataItineraire.lieuArrivee}
                            id="destination"
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 pl-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="lieu d'arrivee"
                            onChange={handleChangeItineraire}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="itineraire"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Code Itinéraire
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              type="text"
                              name="codeItineraire"
                              value={formDataItineraire.codeItineraire}
                              id="itineraire"
                              autoComplete="itineraire"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="Code Itineraire"
                              onChange={handleChangeItineraire}
                            />
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="jourDepart"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Jour
                        </label>
                        <div className="mt-2">
                          <select
                            id="jourDepart"
                            name="jourDepart"
                            value={formDataItineraire.jourDepart}
                            autoComplete="jourDepart-name"
                            className="block w-full rounded-md h-9 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            onChange={handleChangeItineraire}
                          >
                            <option value="">Jour Depart</option>
                            <option value="dimanche">Dimanche</option>
                            <option value="lundi">Lundi</option>
                            <option value="mardi">Mardi</option>
                            <option value="mercredi">Mercredi</option>
                            <option value="jeudi">Jeudi</option>
                            <option value="vendredi">Vendredi</option>
                            <option value="samedi">Samedi</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="time"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Heure
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              type="time"
                              value={formDataItineraire.heureDepart}
                              name="heureDepart"
                              id="time"
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 sm:text-sm sm:leading-6"
                              onChange={handleChangeItineraire}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" onClick={() => {
                      setIsEditing(false);
                      resetFormDataItineraire();
                    }}>
                      Annuler
                    </button>
                    {isEditing && (
                      <button type="button" onClick={() => {
                        deleteCurrentItinerary(selectedItinerary.codeItineraire);
                        setIsEditing(false);
                        resetFormDataItineraire(); }}>
                        Supprimer
                      </button>
                    )}
                    <button
                      type="submit"
                      className="rounded-md gradient px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {isEditing ? "Modifier" : "Ajouter"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="neon bg-white p-6 rounded-lg shadow-lg mt-12 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-center font-semibold leading-7 text-gray-900">
                Voyageurs
              </h2>
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="p-4">
                      Ticket
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                    >
                      Nom
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                    >
                      Date depart
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                    >
                      Nb Place
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                    >
                      Code Categorie
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {voyageurs.length !== 0 ? (
                    voyageurs.map((voyageur) => (
                      <tr
                        key={voyageur.numTicket}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          {voyageur.numTicket}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                          {voyageur.nomVoyageur}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white text-center">
                          {voyageur.emailVoyageur}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                          {voyageur.dateDepart}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                          {voyageur.nbPlace}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                          {voyageur.codeCategorie}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td
                        colSpan="6"
                        className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                      >
                        AUCUN VOYAGEUR
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
    </div>
  );
}

export default Admin;
