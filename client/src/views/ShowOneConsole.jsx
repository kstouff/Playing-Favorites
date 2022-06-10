import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import env from "../env"
import NavBarHeader from '../components/NavBarHeader';

function ShowOneConsole() {
    const [platform, setPlatform] = useState();

    const {id} = useParams();


    
    useEffect(()=>{
        axios.get(`https://api.rawg.io/api/platforms/${id}?key=${env.API_TOKEN}`)
        .then(res => {

            setPlatform(res.data)
            console.log(platform)
        })
        .catch(err => console.log(err))
        

    }, [])




  return (
    <div>
        <NavBarHeader/>
        {platform&&

            <p>{platform.name}</p>

        }
        

    </div>
  )
}

export default ShowOneConsole