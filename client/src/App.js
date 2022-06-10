import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { AppContext } from './contextLib'

import ShowConsoles from './components/ShowConsoles';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginReg from './views/LoginReg';
import ShowOne from './components/ShowOne';
import ShowOneConsole from './views/ShowOneConsole';
import ShowFavorites from './components/ShowFavorites';
import NavBarHeader from './components/NavBarHeader';



function App() {
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("loggedUser")));

  return (
    <AppContext.Provider value = {{loggedUser, setLoggedUser}}>

    <BrowserRouter>
      <NavBarHeader/>
    
    <Routes>

        <Route path ="/games/:id" element= {<ShowOne/>}/>
        <Route path ="/developers/:id" element= {<ShowOne/>}/>
        <Route path ="/platforms/:id" element= {<ShowOneConsole/>}/>
        <Route path ="/favorites" element= {<ShowFavorites/>}/>

        <Route path = "/" element={<Dashboard/>}/>
        <Route path = "/platforms" element={<ShowConsoles/>}/>

    </Routes>
    
    </BrowserRouter>
      </AppContext.Provider>
  );
}

export default App;
