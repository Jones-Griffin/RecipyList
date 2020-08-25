import styled from 'styled-components'
import {NavMobile} from './tagbuttons'
import Link from 'next/link';

const Overlay = styled.div`
background-color: #191716;
display: flex;
justify-content: center;
position: fixed;
top: 0;
right: 0;
height: 500px;
margin-top: 57px;
z-index: 99;
transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
transition: transform 0.3s ease-in-out;
min-width: 200px;
@media(min-width: 875px){
    display:none;
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
  min-width: 100px;
  width: 100%

  &:hover:not(.active){
      background-color: #191716;
      cursor: pointer;
    }
`;

const TagLeft = styled(Tag)`
  border-right:1px solid #bbb;
`;
const TagTop = styled(Tag)`
  border-bottom:1px solid #bbb;
`;

const TagButton = styled.button`
  display: block;
  color: white;
  text-align: center;
  background-color: #333;
  float: left;
  padding: 0 16px;
  text-decoration: none;
  min-width: 120px;
  height: 57px;
  border: none;
  font-family: inherit;
  font-size: 100%;

  &:hover:not(.active){
      background-color: #191716;
      cursor: pointer;
    }
`;

const Loggin = styled.div`
    position: relative;
    top: 60px;

`;

const Loggout = styled(Loggin)`
    display: flex;
    flex-direction: column;
`;



export default function Menu({open, loggedin, logout}){


    return(
        <Overlay open={open}>

            <div>
                <NavMobile/>
                {!loggedin 
                    ?
                    <Loggin loggedin={loggedin}>
                        <Link href="/login/register">
                            <TagLeft>Register</TagLeft>
                        </Link>
                        <Link href="/login">
                            <Tag> Login</Tag>
                        </Link>
                    </Loggin>
                    :
                    <Loggout>
                      <Link  href="/recipe/new-recipe">
                        <TagTop >Add New Recipe</TagTop>
                      </Link>
                      <TagButton onClick={logout}>Logout</TagButton>
                    </Loggout>
                    } 
            </div>

        </Overlay>
    )
}

