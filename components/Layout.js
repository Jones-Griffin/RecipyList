import styled from 'styled-components'
import { useState, useEffect } from 'react';
import fire from '../config/fire-config';
import Link from 'next/link';

const Header = styled.div`
    width: 100%;
    height: 57px;
    background-color: #191716;
    display: flex;
    justify-content: space-between;
    color: #FFFFFF;
    line-height: 57px;
`;

const Title = styled.h1`
    font-weight: bold;
    font-size: 35px;
    color: #603A40;
    color: #FFFFFF;
    line-height: 57px;
    margin: 0;
`;

export default function Layout(props){
    const [loggedIn, setLoggedIn] = useState(false);
    fire.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })
    
  const handleLogout = () => {
    fire.auth()
      .signOut()
  }


    return(
        <div>
            <Header>
                <Title>How To Cook</Title>

                {loggedIn &&
                                <Link href="/recipe/new-recipe">
                                <a>Add New Recipe</a>
                                </Link>
                
                }

                {!loggedIn 
                ?
                <div>
                    <Link href="/login/register">
                    <a>Register</a>
                    </Link> | 
                    <Link href="/login">
                    <a> Login</a>
                    </Link>
                </div>
                :
                <button onClick={handleLogout}>Logout</button>
                } 
            </Header>
            {props.children}
        </div>
    )
}


