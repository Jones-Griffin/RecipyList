import Head from 'next/head';
import fire from '../config/fire-config';
import Link from 'next/link';
import styled from 'styled-components'

import Layout from '../components/Layout'
import RecipyCard from '../components/RecipyCard';

const RecipyCardDiv = styled.div`
  margin: 15px 20px;
  display: grid;
  max-height: 1320px;
  min-height: 60vh;

  grid-template-columns: auto;
  overflow: hidden;

  @media(min-width: 630px){
    grid-template-columns: repeat(2, 1fr);
    max-height: 1056px;
  }
  @media(min-width: 950px){
    grid-template-columns: repeat(3, 1fr);
    max-height: 792px;
  }
  @media(min-width: 1250px){
    grid-template-columns: repeat(4, 1fr);
  }
  // display: flex;
  // flex-wrap: wrap;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  justify-content: space-around;
`;

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
