import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import Link from 'next/link';
import styled from 'styled-components'

import Layout from '../components/Layout'
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

const Home = (props) => {
  const [notification, setNotification] = useState('');
 



  return (
    <div>
    <Head>
      <title>Recipe App</title>
    </Head>
    <Layout >
    <h1>Recipies</h1>
    {notification}
    <RecipyCardDiv> 
      {Object.entries(props.Recipe).map(Recipy =>
          <Link key={Recipy[1].title} href="/recipe/[id]" as={'/recipe/' + Recipy[0]}>
            <a>
            <RecipyCard title= {Recipy[1].title} desc={Recipy[1].description}/>
            </a>

          </Link>
      )}
    </RecipyCardDiv>  
    </Layout>
  </div>
  )
}

export const getServerSideProps = async () => {
  const content = {}
  await fire.database()
  .ref(`RecipyNames`).once('value').then(function(snapshot) {
     return (snapshot.val());
  }).then(result => {
    content['RecipyCards'] = result;
  });;

  
  return {
    props: {
      Recipe: content.RecipyCards,
    }
  }
}
export default Home;
