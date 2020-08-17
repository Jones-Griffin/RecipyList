import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import CreatePost from '../components/createRecipy';
import Link from 'next/link';

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
      <title>Blog App</title>
    </Head>
    <h1>Blog</h1>
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
    <ul>
      {Object.entries(Recipe).map(Recipy =>
        <li key={Recipy}>
          <Link href="/recipe/[id]" as={'/recipe/' + Recipy[1].title}>
            <a>{Recipy[1].title}</a>
          </Link>
        </li>
      )}
    </ul>
    {loggedIn && <CreatePost />}
  </div>
  )
}
export default Home;
