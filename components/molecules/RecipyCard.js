import styled from 'styled-components'

const StyledDiv = styled.div`
    height: 250px;
    width: 275px;
    border: 2px solid black;
    margin: 7px;
    border-radius: 25px;
    box-shadow: 3px 3px 5px grey;
    z-index: 0;
    transition: all 0.1s ease-in-out; 
    &:hover{
        transform: scale(1.05);
        box-shadow: 10px 10px 5px grey;
        z-index: 0;
    }
`;

const TitleDiv = styled.div`
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 5px;

`;

const ImgDiv = styled.div`
    width: 100%;
    background-color: grey;
    height: 60%;
    z-index: 0;
    font-weight: normal;
    font-size: 12px;
    vertical-align: middle;
    line-height: 150px; 
`;

const DescDiv = styled.div`
    font-weight: normal;
    font-size: 12px;


`;

export default function RecipyCard(props){
    return(
    <StyledDiv>
        <TitleDiv>{props.title}</TitleDiv>
        <ImgDiv>300x300</ImgDiv>
        <DescDiv>{props.desc}</DescDiv>
    </StyledDiv>
    )
}

