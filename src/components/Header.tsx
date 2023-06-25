import React from "react";
import "./Header.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {


    
  const [token, setToken] = useState<string | null>(null)

  useEffect(()=>{
    setToken(localStorage.getItem("jwt_token"))
  },[])

  return (
    <>
      <section>
        <div className="flex items-center bg-transparent justify-between py-7 px-5 relative w-full z-10 hover:bg-white group transition duration-500 ease-in-out">
        
          <Link rel="" href={`/`}> 
          <div className="logo text-black text-3xl tracking-widest group-hover:text-black  transition duration-500 ease-in-out">
            Trips
          </div>
          </Link>
         
          <div className="flex text-black group-hover:text-black transition duration-500 ease-in-out">
            <Link href={`/login`} className="appearance-none mr-6">
              <svg
                width="24px"
                height="24px"
                role="presentation"
                viewBox="0 0 24 24"
              >
                <g
                  className="text-black group-hover:text-black "
                  stroke="currentColor"
                  fill="none"
                  fill-rule="nonzero"
                >
                  <path
                    d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                    fill="none"
                    stroke-width="2px"
                  ></path>
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    fill="none"
                    stroke-width="2px"
                  ></circle>
                </g>
              </svg>
            </Link>

            <Link href={"/insertTrip"} className="appearance-none mr-6">
            <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

<title/>

<g id="Complete">

<g data-name="add" id="add-2">

<g>

<line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="19" y2="5"/>

<line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="5" x2="19" y1="12" y2="12"/>

</g>

</g>

</g>

</svg>
            </Link>

            {token && 
            <Link href={"/booked"} className="appearance-none">
              <svg
                className=""
                width="24px"
                height="24px"
                viewBox="0 -2 37 35"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <g
                  transform="translate(0.500000, 0.500000)"
                  stroke="none"
                  fill="currentColor"
                  fill-rule="nonzero"
                >
                  {" "}
                  <path d="M0.2,11 L9.5,29 L26.4,29 L35.7,11 L0.2,11 Z M24.5,26 L11.5,26 L4.8,14 L31.2,14 L24.5,26 L24.5,26 Z M18.5,3 C22.7,3 25.5,6.3 25.5,8.5 L28.5,8.5 C28.5,4.5 24.2,0 18.5,0 C12.8,0 8.5,4.5 8.5,8.5 L11.5,8.5 C11.5,6.3 14.3,3 18.5,3 Z"></path>{" "}
                </g>{" "}
              </svg>
            </Link>
}

          </div>
        </div>

      
      </section>
    </>
  );
}
