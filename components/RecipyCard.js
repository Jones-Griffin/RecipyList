import styled from 'styled-components'

const StyledDiv = styled.div`
    height: 250px;
    max-width: 350px;
    width: 33vw;
    border: 2px solid black;
    border-radius: 25px;
    box-shadow: 3px 3px 5px grey;
    transition: all 0.1s ease-in-out; 
    &:hover{
        transform: scale(1.05);
        box-shadow: 10px 10px 5px grey;
    }
`;

export default function RecipyCard(props){
    return(
    <StyledDiv>
        <div></div>
        <div></div>
        <div>{props.title}</div>
    </StyledDiv>
    )
}

