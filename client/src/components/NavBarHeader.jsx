import React from 'react'
// import {NavBar, Container, Nav, NavDropdown} from 'react-bootstrap'
import Container  from 'react-bootstrap/Container'
import NavBar  from 'react-bootstrap/NavBar'
import Nav  from 'react-bootstrap/Nav'
import NavDropdown  from 'react-bootstrap/NavDropdown'
import { useEffect, useState  } from 'react'
import axios from 'axios'
import env from "../env"
import { useAppContext } from '../contextLib'








function NavBarHeader() {
  
  const [platforms, setPlatforms] = useState();
  const {loggedUser} = useAppContext();

  useEffect ( ()=>{

  console.log(loggedUser)
  axios.get(`https://api.rawg.io/api/platforms?key=${env.API_TOKEN}`)
  .then(response => {
  console.log(response.data.results)
  setPlatforms(response.data.results)
})
.catch(err=> console.log(err))
}, [])


  return (
<NavBar bg="dark" variant='dark' expand="lg">
  <Container>
    <NavBar.Brand className='h1' href="#home">Playing Favorites</NavBar.Brand>
    <NavBar.Toggle aria-controls="basic-navbar-nav" />
    <NavBar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/dashboard">Home</Nav.Link>
        <Nav.Link href="/favorites">Favorites</Nav.Link>
        <NavDropdown title="Platforms" id="basic-nav-dropdown">
          {platforms&& platforms.map((platform, i) =>{
            return(
              <NavDropdown.Item key={i} href={`/platforms/${platform.id}`}>{platform.name}</NavDropdown.Item>

            )
          })}
        </NavDropdown>
      </Nav>
    </NavBar.Collapse>
  </Container>
</NavBar>
  )
}

export default NavBarHeader