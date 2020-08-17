import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import CreatePost from '../components/createRecipy';
import Link from 'next/link';

const Home = () => {
  const [Recipe, setRecipe] = useState([]);useEffect(() => {
    fire.database()
      .ref('RecipyNames').once('value').then(function(snapshot) {
        const Recipe = (snapshot.val() && snapshot.val() || 'Anonymous');
      
        setRecipe(Recipe);
      });
  }, []);
  console.log("test", Recipe)
  return (
    <div>
      <Head>
        <title>Blog App</title>
      </Head>
      <h1>Blog</h1>
      <ul>
        {Object.entries(Recipe).map(Recipy =>
          <li key={Recipy}>
            <Link href="/recipe/[id]" as={'/recipe/' + Recipy[1].title}>
              <a>{Recipy[1].title}</a>
            </Link>
            
          </li>
        )}
      </ul>
      <CreatePost />
    </div>
  )
}
export default Home;