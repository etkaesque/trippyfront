import { useState } from "react";
import Header from "../../components/Header";
import styles from "./index.module.css";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter()

  const [newUser, setNewUser] = useState({
    name: "",
    email:"",
    password:""
  })

  const handleSubmit = async (event: any) =>{
    event.preventDefault();

    try {
      
    const response = await axios.post("http://localhost:8080/signUp", newUser)
  
    localStorage.setItem("jwt_token", response.data.jwt_token)
    localStorage.setItem("jwt_refresh_token", response.data.jwt_refresh_token)

    router.push("/")
 


    } catch (error) {
      console.log("could not connect to server: ", error)
    }


  
  }

  const handleChange = (event : any) => {
    
    const {name, type, value} = event.target

  
    setNewUser((prevFormData) => {
      return {
        ...prevFormData,
        [name] : value
      }
    })



  }




  return (
    <div className={styles.imageBackground}>
      <Header></Header>

      <main className="w-screen mt-8">


        <section className="bg-zinc-50 w-4/5 p-5 mx-auto flex flex-col justify-center">

          <div className="flex justify-center m-6">
           <h1 className="text-2xl">Register</h1>
          </div>
   

          <div className="max-w-2xl mx-auto bg-zinc-50 p-16">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    First name
                  </label>
                  <input
                    onChange={handleChange}
                    value={newUser.name}
                    type="text"
                    id="name"
                    name="name"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
               
          
            
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Email address
                </label>
                <input
                  onChange={handleChange}
                  value={newUser.email}
                  type="email"
                  id="email"
                  name="email"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john.doe@company.com"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  onChange={handleChange}
                  value={newUser.password}
                  type="password"
                  id="password"
                  name="password"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="•••••••••"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="confirm_password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Confirm password
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="•••••••••"
                  required
                />
              </div>
             
              <button
                type="submit"
                className="text-white bg-green-400 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>

        
          </div>

        </section>


      </main>
    </div>
  );
}
