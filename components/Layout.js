import styled from 'styled-components'
import { useState, useEffect } from 'react';
import fire from '../config/fire-config';
import Link from 'next/link';

import NavButtons from './tagbuttons'

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
    &:hover{
      cursor: pointer;
    }
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
                <Link href="/">
                  <Title>How To Cook</Title>
                </Link>

                <NavButtons/>
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
                <div>
                <Link href="/recipe/new-recipe">
                <a>Add New Recipe</a>
                </Link>
                <button onClick={handleLogout}>Logout</button>
                </div>
                } 
            </Header>
            {props.children}
        </div>
    )
}


