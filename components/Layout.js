import styled from 'styled-components'
import { useState, useEffect } from 'react';
import fire from '../config/fire-config';
import Link from 'next/link';
import Hamburger from './hamburgr'

import NavButtons from './tagbuttons'

const Header = styled.div`
    width: 100%;
    height: 57px;
    background-color: #191716;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #FFFFFF;
    line-height: 57px;
    padding-left: 7px;
    @media(max-width: 875px){
      padding: 0 7px;
    }
    
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



const Tag = styled.a`
  display: block;
  color: white;
  text-align: center;
  padding: 0 16px;
  text-decoration: none;
  float: left;
  background-color: #333;
  min-width: 85px;

  &:hover:not(.active){
      background-color: #191716;
      cursor: pointer;
    }
`;

const TagLeft = styled(Tag)`
  border-right:1px solid #bbb;
`;

const TagButton = styled.button`
  display: block;
  color: white;
  text-align: center;
  background-color: #333;
  float: left;
  padding: 0 16px;
  text-decoration: none;
  min-width: 75px;
  height: 57px;
  border: none;
  font-family: inherit;
  font-size: 100%;

  &:hover:not(.active){
      background-color: #191716;
      cursor: pointer;
    }
`;
const Mobile = styled.div`
    @media(min-width: 875px){
      display: none;
    }
`;
const Desktop = styled.div`
    @media(max-width: 875px){
      display: none;
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
                <Mobile>
                  <Header>
                    <Link href="/">
                      <Title>How To Cook</Title>
                    </Link>
                    <Hamburger loggin ={loggedIn} loggout={handleLogout}/>
                  </Header>
                </Mobile>
                <Desktop>
                  <Header>
                    <Link href="/">
                      <Title>How To Cook</Title>
                    </Link>
                    <NavButtons/>
                    {!loggedIn 
                    ?
                    <div>
                        <Link href="/login/register">
                        <TagLeft>Register</TagLeft>
                        </Link>
                        <Link href="/login">
                        <Tag> Login</Tag>
                        </Link>
                    </div>
                    :
                    <div>
                      <Link  href="/recipe/new-recipe">
                        <TagLeft >Add New Recipe</TagLeft>
                      </Link>
                      <TagButton onClick={handleLogout}>Logout</TagButton>
                    </div>
                    } 
                  </Header>
                </Desktop>
            {props.children}
        </div>
    )
}


