import Head from 'next/head';
import fire from '../config/fire-config';
import Link from 'next/link';
import styled from 'styled-components'

import Layout from '../components/Layout'
import RecipyCard from '../components/RecipyCard';
import RecipyCardDiv from '../components/RecipyCardStyling'

const Title = styled.h1`
@media(max-width: 875px){
  margin-top: 57px;
}
`;

const Home = (props) => {



  return (
    <div>
    <Head>
      <title>Recipe App</title>
    </Head>
    <Layout >
    <Title>Recipies</Title>
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
