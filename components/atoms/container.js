import styled from 'styled-components'

const StyledDiv = styled.div`
    margin: 0 20px;
`;
export default function (props){
    return(
        <StyledDiv>
            {props.children}
        </StyledDiv>
    )
}