import styled from 'styled-components'
import Menu from './mobileMenu'

const StyledBurger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  overflow: hidden;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  
  z-index: 11;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: #FFFFFF;
    border-radius: 10px;
    transition: all 0.3s linear;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`


const Burger = ({ open, setOpen }) => {
    return (
        <StyledBurger open={open} onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
        </StyledBurger>
    )
  }



export default function Hamburgr(props) {

    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Menu open={open} loggedin = {props.loggin} logout = {props.loggout}/>
            <Burger open={open} setOpen={setOpen} />
        </div>
    )
}