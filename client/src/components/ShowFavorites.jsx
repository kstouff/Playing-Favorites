import axios from 'axios';
import React , { useState, useEffect }from 'react'
import { Link } from 'react-router-dom';
import { useAppContext } from '../contextLib'
import env from "../env"
import NavBarHeader from './NavBarHeader';


function ShowFavorites() {

    const [favorites, setFavorites] = useState();

    const {loggedUser} = useAppContext();

    useEffect ( ()=>{
        axios.get(`http://localhost:8000/users/${loggedUser._id}`, {withCredentials:true})
        .then(res => {
            setFavorites(res.data.favoritedGames)
        })
        .catch(err => console.log(err))


    }, [])
  return (
    <div>
        {favorites && favorites.map((game, i)=>{
            return(
                <div key={i}>
                    <Link to={`/games/${game.id}`}>{game.name}</Link>
                </div>
            )
        })}
    </div>
  )
}

export default ShowFavorites