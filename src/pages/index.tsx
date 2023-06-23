import Header from "../components/Header"
import styles from "./index.module.css"
import Card from "./components/card/Card"
import axios from "axios"

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

export default function Home({data}: {data: tripType[]}) {



  return (


    <div className={styles.imageBackground}>
       <Header></Header>

       <main className="w-screen mt-8">

          <section className="bg-zinc-50 w-4/5 p-6 mb-4 mx-auto flex flex-wrap">

            {data && data.map((trip) => {

              return (
                <Card trip={trip} key={trip.id}/>
              )


            })}


          



          </section>
    

      </main>

    </div>
  

    
  )
}

export async function getServerSideProps(){

  const response = await axios.get("http://localhost:8080/trips")
  const data = response.data.trips
  console.log(data)


  return {props: {data} }

}
