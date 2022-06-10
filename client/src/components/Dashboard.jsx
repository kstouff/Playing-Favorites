import React, { useState, useEffect }  from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAppContext } from '../contextLib'
import { useParams } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import env from "../env"
import { Link } from 'react-router-dom'
import axios from 'axios'


function Dashboard() {

  const [gameList, setGameList] = useState([]);  
  const [recomendedGamesList, setRecomendedGamesList] = useState([]);
  const [tagFilters, setTagFilters] = useState('free-to-play');
  const [tagList, setTagList] = useState([]);
  const [enabledTags, setEnabledTags] = useState([]);
  const [showTags, setShowTags] = useState(false);
  const [showTagButtonText, setShowTagButtonText] = useState('Show Tags')
  const {loggedUser} = useAppContext();



  const handleToggleShowTags = () =>{
    setShowTags(!showTags);
    if(showTags == true){setShowTagButtonText("Show Tags")}
    else{setShowTagButtonText("Hide Tags")}
  }

  const getRecomendedGames = (gameList) =>{
      const tempGameList = []
      for (let i = 0; i < 5; i++) {
        let randomGame = gameList[parseInt(Math.random() * gameList.length, 10)]

        tempGameList.push(randomGame)

      }
      setRecomendedGamesList(tempGameList);
}
  const tagListStateGenerator = (tagList) =>{
    let id = 0
    const tempTagList = []
    tagList.forEach(tag => {
      tempTagList.push({
        index: id,
        slug:`${tag.slug}`,
        name:`${tag.name}`,
        checked: false
      })
      id += 1
    });
    return tempTagList
  }


  const handleFilteredRefresh = () =>{
      axios.get(`https://api.rawg.io/api/games?tags=${tagFilters}&page_size=30&key=${env.API_TOKEN}`)
            .then(response => {
            console.log(response.data)
            setRecomendedGamesList(response.data.results)
            console.log(recomendedGamesList)
            })
  }



  const handleTagCheckBox = (index) =>{
    let urlEnabledTags = ""
    const tagsRef = [...tagList];
    const tempEnabledTags = []
    tagsRef[index].checked = !tagsRef[index].checked;
    setTagList(tagsRef)
    tagsRef.forEach(tag => {
      if(tag.checked == true){
        tempEnabledTags.push(tag)
      }
    });
    setEnabledTags(tempEnabledTags)

    tempEnabledTags.forEach(tag => {
      if(urlEnabledTags == "")
      {
        urlEnabledTags += tag.slug
      }
      else{
        urlEnabledTags += `,${tag.slug}`

      }
    })
    setTagFilters(urlEnabledTags)
  }




    useEffect ( ()=>{



            axios.get(`https://api.rawg.io/api/games?tags=${tagFilters}&page_size=30&key=${env.API_TOKEN}`)
            .then(response => {

            getRecomendedGames(response.data.results)
            setGameList(response.data.results)
            axios.get(`https://api.rawg.io/api/tags?page_size=100&key=${env.API_TOKEN}`)
            .then(response => {

              setTagList(tagListStateGenerator(response.data.results))

            })
          })

          
          .catch(err=> console.log(err))
        }, [])
  
  return (
    <Container>
        <div className='d-flex justify-content-around mb-2'>
        <button onClick={handleToggleShowTags}>{showTagButtonText}</button>
        <button onClick={handleFilteredRefresh}>Set Filters</button>
        </div>

      <Row className=''>
        {
            tagList && showTags &&tagList.map((tag, i)=>{
                return(<Col className='text-center border' style={{ maxWidth: '12rem', maxHeight: "30rem", minWidth: '14rem', minHeight: "2rem" }} key={i}>
                    <div>
                      <label className='lead' style={{fontSize: '1rem'}}>{tag.name}</label>
                    </div>
                    <div>
                      <input type="checkbox" checked = {tag.checked} onChange={()=> handleTagCheckBox(i)}/>
                    </div>
                </Col>
                )
            })
        }
      </Row>
      <Row className=''>
        {
            recomendedGamesList && recomendedGamesList.map((game, i)=>{
                return(<Col key={i}>

                    <Card className='text-center m-2' style={{ maxWidth: '22rem', maxHeight: "30rem", minWidth: '22rem', minHeight: "30rem" }}>
                      <Card.Header className='lead'>{game.name}</Card.Header>
                      <div className='justify-content-around'>
                        <Card.Img variant="top"  src={game.background_image} style={{maxHeight: "11rem" }}/>
                      </div>
                      <Card.Body className='bg-dark text-light'>
                        <Card.Title>{game.name}</Card.Title>
                        <Card.Text>
                          Some quick example text to build on the card title and make up the bulk of
                          the card's content.
                        </Card.Text>
                        <Button ><Link className='text-light' to={`/games/${game.id}`}>See More</Link></Button>
                      </Card.Body>
                    </Card>
                    
                </Col>
                )
            })
        }
      </Row>

      <Row>
      {
        enabledTags && enabledTags.map((tag, i)=>{
          return(<Col key={i} className='d-flex'>
              {tag.name}
              <button className="btn btn-danger" onClick={()=> handleTagCheckBox(tag.index)}>x</button>
            

          </Col>)
        })
      }
      </Row>  

    </Container>
  )
}

export default Dashboard