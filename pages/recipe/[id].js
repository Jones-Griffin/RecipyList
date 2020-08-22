import { useEffect, useState } from 'react';
import fire from '../../config/fire-config';
import Link from 'next/link'

import styled from 'styled-components'

import Layout from '../../components/Layout'

const StyledTitle = styled.h1`
@media(max-width: 875px){
  margin-top: 57px;
}
`;

const Recipe = (props) => {
   return (
    <Layout>
      <StyledTitle>{props.Title}</StyledTitle>
      <h3>Ingredients</h3>
      <ul>
      {Object.entries(props.Ingredients).map(ingree =>
        <li key={ingree[0]}>
          {ingree[1]}
        </li>
      )}
      </ul>
      <h3>Method</h3>
      <ol>
      {Object.entries(props.Method).map(Method =>
          <li key={Method[0]}>
            {Method[1]}
          </li> 
      )}
      </ol>
      <Link href="/">
        <a>Back</a>
      </Link>
    </Layout>
  )
}

export const getServerSideProps = async ({ query }) => {
  const content = {}
  await fire.database()
  .ref(`Recipies/${query.id}`).once('value').then(function(snapshot) {
     return (snapshot.val());
  }).then(result => {
    content['Title'] = result.title;
    content['Ingredients'] = result.Ingredients;
    content['Method'] = result.Method;

  });;
  
  return {
    props: {
      Title: content.Title,
      Method: content.Method,
      Ingredients: content.Ingredients,
    }
  }
}
export default Recipe