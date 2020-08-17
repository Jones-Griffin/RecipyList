import { useEffect, useState } from 'react';
import fire from '../../config/fire-config';
import Link from 'next/link'

const Recipe = (props) => {
  const [Recipe, setRecipe] = useState(null);  useEffect(() => {
    fire.database()
      .ref(`Recipies/${props.id}`).once('value').then(function(snapshot) {
        const Recipe = (snapshot.val());
        console.log(Recipe)
        setRecipe(Recipe);
      });
  }, []);  if(!Recipe){
    return(
      <h2>Loading...</h2>
    )
  }  return (
    <div>
      <h2>{props.id}</h2>
      <p>
        {Recipe.Method}
      </p>
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  )
}
Recipe.getInitialProps = ({ query }) => {
  return {
      id: query.id,
  }
}
  export default Recipe