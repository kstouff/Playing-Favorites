
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import env from "../env"
import NavBarHeader from './NavBarHeader'

function ShowOne() {

    const [gameData, setGameData] = useState();

    const user = JSON.parse(localStorage.getItem('loggedUser'))

    const {id} = useParams();

    const handleAddFavorite = () =>{
        axios.patch(`http://localhost:8000/users/${user._id}/favorites`, gameData)
        .then(res =>{
            localStorage.setItem("loggedUser", JSON.stringify(res.data))
            console.log(res.data)
        })
        .catch(err => console.log (err))
        
    }

    useEffect(()=>{
        axios.get(`https://api.rawg.io/api/games/${id}?key=${env.API_TOKEN}`)
        .then(response => {
            setGameData(response.data)
        .catch(err => console.log(err))
        })

    }, [])
  return (
    <div>
        {
            gameData&&
            <div className='container'>
                <button onClick={handleAddFavorite}>favorite Game</button>
                <div className='d-flex justify-content-around'>
                    <h3 className='text-center'>{gameData.name}</h3>
                    <h5 className='text-center'>Rated: {gameData.esrb_rating.name}</h5>
                </div>

                <img className='img-fluid' src={gameData.background_image} alt="" />
                <div className='d-flex container'>
                    <div className="card" style={{width: '22rem'}}>
                        <div className="card-header">
                            <h3 className="display-5">Platforms:</h3>
                        </div>
                            <ul className='list-group list-group-flush'>
                                {gameData.platforms.map((platform, i)=>{
                                    return(
                                        <li className='list-group-item'>{platform.platform.name}</li>
                                    )
                                })}
                                </ul>
    
                    </div>
                    <div className="card" style={{width: '22rem'}}>
                        <div className="card-header">
                        <h3 className="display-5">Genres:</h3>
                        </div>
                            <ul className='list-group list-group-flush'>
                                {gameData.genres.map((genre, i)=>{
                                    return(
                                        <li className='list-group-item'>{genre.name}</li>
                                    )
                                })}
                            </ul>
                    </div>
                </div>
            </div>
        }

    </div>
  )
}

export default ShowOne