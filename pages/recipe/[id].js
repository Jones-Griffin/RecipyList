import { useEffect, useState } from 'react';
import fire from '../../config/fire-config';
import Link from 'next/link'

const Recipe = (props) => {
  {console.log(Object.entries(props.Method))}
   return (
    <div>
      <h2>{props.Title}</h2>
      <ul>
      {Object.entries(props.Ingredients).map(ingree =>
        <li key={ingree[0]}>
          {ingree[0]} {ingree[1]}
        </li>
      )}
      </ul>
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
    </div>
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