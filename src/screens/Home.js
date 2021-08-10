import React from "react"
import "./Home.css"
import logo from "../images/logo.png"
import List from "../components/List"
const Home = () =>{

    return (
        <div className = "home">    
            {/* <img className = "logo" src = {logo} alt = "" /> */}
            <List className="list" />
            {/* <div className="gradient" /> */}
            
        </div>
    )

}

export default Home