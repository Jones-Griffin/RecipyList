import { useEffect, useState } from 'react';
import fire from '../../config/fire-config';
import Link from 'next/link'

const Recipe = (props) => {
   return (
    <div>
      <h2>{props.title}</h2>
      <p>
        {props.content}
      </p>
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
    content['title'] = query.id;
    content['content'] = result.Method;
  });;
  return {
    props: {
      title: content.title,
      content: content.content,
    }
  }
}
  export default Recipe