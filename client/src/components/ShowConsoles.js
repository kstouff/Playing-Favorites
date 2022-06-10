import React, { useState, useEffect }  from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import env from "../env"
import { Link } from 'react-router-dom'
import axios from 'axios'


function ShowConsoles() {

    const[consoleList, setConsoleList] = useState([])
    
    useEffect ( ()=>{
        axios.get(`https://api.rawg.io/api/games?key=${env.API_TOKEN}`)
        .then(response => {
        console.log(response.data.results)
        setConsoleList(response.data.results)
      })
      .catch(err=> console.log(err))
    }, [])

  return (
    <div>
        {
            consoleList && consoleList.map((console, i)=>{
                return(<div key={i}>
                    <img className='w-25'  src={console.background_image} alt="" />
                    <h5>{console.name}</h5>
                    <p>Genres: {console.genres.map((genre, j)=>{
                        return(
                            <div key={j}>
                                {genre.name}
                            </div>
                        )
                    })}
                    </p>
                </div>
                )
            })
        }
    </div>
  )
}

export default ShowConsoles