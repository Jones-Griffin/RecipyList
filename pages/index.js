import Head from 'next/head';
import fire from '../config/fire-config';
import Link from 'next/link';
import styled from 'styled-components'

import Layout from '../components/Layout'
import RecipyCard from '../components/RecipyCard';

import RecipyCardDiv from '../components/RecipyCardStyling'


const Home = (props) => {



  return (
    <div>
    <Head>
      <title>Recipe App</title>
    </Head>
    <Layout >
    <h1>Recipies</h1>
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
  .ref(`RecipyNames`).limitToLast(15).once('value').then(function(snapshot) {
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
