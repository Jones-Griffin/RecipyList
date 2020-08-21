// import fire from '../config/fire-config';
import Link from 'next/link';
import styled from 'styled-components'

import Layout from '../../components/Layout'
import CreatePost from '../../components/createRecipy';
import { useState, useEffect } from 'react';
import fire from '../../config/fire-config';


const NewRecipy = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    fire.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })

    return (
        <Layout>
        {!loggedIn?
            <div>
                <p>you must be loggin in to perform this function</p>
                <Link href="/">
                <a>Back</a>
                </Link>
            </div>

            :
            <div>
            <CreatePost Tags={props.Tags}/>

            <Link href="/">
            <a>Back</a>
            </Link>
            </div>

        }


        </Layout>

    )

}

export const getServerSideProps = async () => {
    const content = {}
    await fire.database()
    .ref(`Tags`).once('value').then(function(snapshot) {
       return (snapshot.val());
    }).then(result => {
      content['Tags'] = result;
    });
    
    return {
      props: {
        Tags: content.Tags,
      }
    }
  }

export default NewRecipy