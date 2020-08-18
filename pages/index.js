import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import Link from 'next/link';
import styled from 'styled-components'

import CreatePost from '../components/createRecipy';
import RecipyCard from '../components/RecipyCard';

const RecipyCardDiv = styled.div`
  margin: 15px 20px;
  display: flex;
  flex-wrap: wrap;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  justify-content: space-around;
`;

const Home = () => {
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  fire.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })

  const [Recipe, setRecipe] = useState([]);useEffect(() => {
    fire.database()
      .ref('RecipyNames').once('value').then(function(snapshot) {
        const Recipe = (snapshot.val() && snapshot.val() || 'Anonymous');
      
        setRecipe(Recipe);
      });
  }, []);

  const handleLogout = () => {
    fire.auth()
      .signOut()
      .then(() => {
        setNotification('Logged out')
        setTimeout(() => {
          setNotification('')
        }, 2000)
      });
  }

  console.log("test", Recipe)
  return (
    <div>
    <Head>
      <title>Recipe App</title>
    </Head>
    <h1>Recipies</h1>
    {notification}
    {!loggedIn 
    ?
      <div>
        <Link href="/login/register">
          <a>Register</a>
        </Link> | 
        <Link href="/login">
          <a> Login</a>
        </Link>
      </div>
    :
      <button onClick={handleLogout}>Logout</button>
    } 
    <RecipyCardDiv> 
      {Object.entries(Recipe).map(Recipy =>
          <Link key={Recipy[1].title} href="/recipe/[id]" as={'/recipe/' + Recipy[0]}>
            <a>
            <RecipyCard title= {Recipy[1].title}/>
            </a>

          </Link>
      )}
    </RecipyCardDiv>  
    {loggedIn && <CreatePost />}
  </div>
  )
}
export default Home;
