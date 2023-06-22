import Header from "../../components/Header";
import styles from "./index.module.css";
import React from "react";
import { useState, useEffect } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    destination: "",
    duration: "",
    imageUrl: "",
    free_food: false,
    price: 0,
    date: "",
  });

  function handleChange(event: any) {
    const { name, value, type } = event.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? !prevFormData.free_food : value,
      };
    });
    console.log(formData);
  }

  return (
    <div className={styles.imageBackground}>
      <Header></Header>

      <main className="w-screen mt-8">
        <section className="bg-zinc-50 w-4/5 p-5 mx-auto flex flex-wrap">
          
          <form className="max-w-2xl mx-auto  p-16">
            <div className="grid justify-items-center gap-6 mb-6 lg:grid-cols-1">
              <div>
                <label
                  htmlFor="destination"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Destination
                </label>
                <input
                  onChange={handleChange}
                  value={formData.destination}
                  type="text"
                  id="destination"
                  name="destination"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Berlin"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Duration in days
                </label>
                <input
                  onChange={handleChange}
                  value={formData.duration}
                  type="text"
                  id="duration"
                  name="duration"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="15"
                  required
                />
              </div>

              <div>
                
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Price €
                </label>
                
                <input
                
                  onChange={handleChange}
                  value={formData.price}
                  type="text"
                  id="price"
                  name="price"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Price"
                  required
                /> 

              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Date
              </label>
              <input
                onChange={handleChange}
                value={formData.date}
                type="text"
                id="date"
                name="date"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="date"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="imageUrl"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Image Url
              </label>
              <input
                onChange={handleChange}
                value={formData.imageUrl}
                type="text"
                id="imageUrl"
                name="imageUrl"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="https://yourphoto.com"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="free_food"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Free Food
              </label>
              <input
                onChange={handleChange}
                //@ts-ignore
                value={formData.free_food}
                type="checkbox"
                id="free_food"
                name="free_food"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="mb-6 grid justify-center">

            <button
              type="submit"
              className="text-white bg-green-400 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Trip
            </button>

            </div>

           
          </form>

        </section>
      </main>
    </div>
  );
}
