import styled from 'styled-components'

const StyledDiv = styled.div`
    margin: 0 0 0 20px;
    z-index: -10;
`;
export default function PageContainer (props){
    return(
        <StyledDiv>
            {props.children}
        </StyledDiv>
    )
}