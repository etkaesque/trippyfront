import styles from "./index.module.css"
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { useRouter } from "next/router";



export default function Home() {
    
  const router = useRouter()
  const [token, setToken] = useState<string | null>("")
  const [userData, setUserData] =  useState<{ name: string } | null>(null)
  const [serverResponse, setServerResponse] =  useState<string>("")
  const [isLogin, setIslogin] = useState(false)
  const [loginUser, setLoginUser] = useState({
    email:"",
    password:""
  })
  const [newUser, setNewUser] = useState({
    name: "",
    email:"",
    password:"",
    confirm_password:"",
  })





  useEffect(()=>{
    setToken(localStorage.getItem("jwt_token"))
  },[])

  useEffect(()=>{
    
   
    const getUser = async () => {
      const response = await axios.get("https://trippy-jt62.onrender.com/user",
      {
        headers: {
          authorization: token
        }
    })

      setUserData(response.data.user)
      console.log(response.data.user.booked_trips)
      
    }

    if(token) {
      getUser()
    }

  },[token])


  const handleLoginUser = (event : any) => {
    
    const {name, type, value} = event.target

  
    setLoginUser((prevFormData) => {
      return {
        ...prevFormData,
        [name] : value
      }
    })



  }

  const handleLoginSumbit = async (event: any) =>{
    event.preventDefault();

    try {
      
    const response = await axios.post("https://trippy-jt62.onrender.com/login", loginUser)
  
    localStorage.setItem("jwt_token", response.data.jwt_token)
    localStorage.setItem("jwt_refresh_token", response.data.jwt_refresh_token)

    router.push("/")
 


    } catch (error) {
      console.log("could not connect to server: ", error)
    }


  
  }

  const handleSubmit = async (event: any) =>{
    event.preventDefault();

    try {
      
    const response = await axios.post("https://trippy-jt62.onrender.com/signUp", newUser)
  
    localStorage.setItem("jwt_token", response.data.jwt_token)
    localStorage.setItem("jwt_refresh_token", response.data.jwt_refresh_token)

    router.push("/")
 


    } catch (error : any) {
      setServerResponse(error.response.data.response)
      console.log("could not validate new user: ", error)
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

  const changeSection =  (event :any ) => {

    setIslogin(!isLogin)

  }

  const deleteTokenAndData = () =>{
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("jwt_refresh_token");
    setToken(null)
    setUserData(null)
    router.reload()
  }

    console.log(serverResponse)

  return (
    <div className={styles.imageBackground}>
      <Header></Header>

      <main className="w-screen mt-8">

        {token && userData ? (
        <div className="flex flex-col content-center items-center justify-center m-6 gap-x-8 bg-zinc-50 p-5 ">
          <div>

            <h1 className="text-2xl" >Welcome! {<span className="text-green-500">{userData.name}</span>}</h1>
            <p>How are you?</p>

          </div>

          <div>
            
          <button onClick={deleteTokenAndData} className="mt-12 text-green-500 hover:text-green-800">Log Out</button>
          </div>

        </div>) :(        

            <div className="loginRegisterSections">

              
            {isLogin ? (
            <section className="bg-zinc-50 w-4/5 h-screen p-5 mx-auto flex flex-col justify-center">

              <div className="flex flex-col content-center items-center justify-center m-6">
              <h1 className="text-2xl ">Register</h1>
              <button onClick={changeSection} className="text-green-500 hover:text-green-800">Already have an account? Log In here.</button>
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
                      value={newUser.confirm_password}
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

                <div> {serverResponse && (<p className={styles.serverRes}>{serverResponse}</p>)}</div>


              </div>

            </section>
            ) : (
            <section className="bg-zinc-50 w-4/5 h-screen p-5 mx-auto flex flex-col justify-center">

            <div className="flex flex-col content-center items-center justify-center m-6">
            <h1 className="text-2xl ">Log In</h1>
            <button onClick={changeSection} className="text-green-500 hover:text-green-800">Don't have an account? Click here!</button>
            </div>


            <div className="max-w-2xl mx-auto bg-zinc-50 p-16">
            <form onSubmit={handleLoginSumbit}>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email address
              </label>
              <input
                onChange={handleLoginUser}
                value={loginUser.email}
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
                onChange={handleLoginUser}
                value={loginUser.password}
                type="password"
                id="password"
                name="password"
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
            )}




            </div>
        )}



      </main>
    </div>
  );
}
