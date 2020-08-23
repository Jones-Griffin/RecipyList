
import styled from 'styled-components'


const RecipyCardDiv = styled.div`
  margin: 15px 20px;
  margin-right: 0;
  display: grid;
  max-height: 1320px;
  min-height: 60vh;

  grid-template-columns: auto;
  overflow: hidden;

  @media(min-width: 675px){
    grid-template-columns: repeat(2, 1fr);
    max-height: 1056px;
  }
  @media(min-width: 950px){
    grid-template-columns: repeat(3, 1fr);
    max-height: 792px;
  }
  @media(min-width: 1250px){
    grid-template-columns: repeat(4, 1fr);
  }
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  justify-items: center;
`;

export default RecipyCardDiv;