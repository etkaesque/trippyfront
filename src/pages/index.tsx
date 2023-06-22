import Header from "../components/Header"
import styles from "./index.module.css"
import Card from "./components/card/Card"

export default function Home() {
  return (

    <div className={styles.imageBackground}>
       <Header></Header>

       <main className="w-screen mt-8">

          <section className="bg-zinc-50 w-4/5 mx-auto flex flex-wrap">

              
            <Card/>



          </section>
    

      </main>

    </div>
  

    
  )
}
