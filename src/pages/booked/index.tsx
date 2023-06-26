import Header from "@/components/Header"
import Card from "../components/card/Card"
import { useEffect, useState } from "react"
import axios from "axios"
import styles from "./index.module.css"
import Link from "next/link"

type tripType = {

    destination_city: string,
    id: string,
    destination_country: string,
    duration: string,
    imageUrl: string,
    free_food: boolean
    price: number,
    date: Date,
    date_uploaded: Date;
    description: string,
    travel_by: string,
  
  }
  


export default function Page() {

    const [data, setData] = useState<tripType[]>()



    useEffect(()=>{

        const getUserTrips = async () => {

                            
            const jwt_token = localStorage.getItem('jwt_token')

            if(jwt_token) {
                
            const response = await axios.get(
                "http://localhost:8080/userTrips",
                {
                    headers: {
                    authorization: jwt_token
                    }
                }
            )
            
            setData(response.data.userWithTrips[0].user_trips)
            }

        }

        getUserTrips()

    },[])


 

  
    return (
        <div  className={styles.imageBackground}>
        <Header/>

        <main className="w-screen mt-8">

      
        <div className="bg-zinc-50 w-4/5 p-6 mb-4 mx-auto h-full">

            {data && data.length > 0 ? (

                <div className=" flex flex-wrap w-full flex-row h-full"> 
                    <h1 className="w-full text-2xl">Your booked trips</h1>
                    {
                         
                data.map((trip) => {

                    return (
                    <Card  trip={trip} key={trip.id}/>
                    ) })}

                    
                </div>
         

            ) :(<h1 className="text-3xl">Your booked trips will appear here</h1>)}





        </div>




        
       



        </main>


        </div>
    )
}

