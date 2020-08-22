import fire from '../../config/fire-config';
import Link from 'next/link'
import styled from 'styled-components'

import Layout from '../../components/Layout'
import RecipyCard from '../../components/RecipyCard';
import RecipyCardDiv from '../../components/RecipyCardStyling'

const Title = styled.h1`
@media(max-width: 875px){
  margin-top: 57px;
}
`;

export default function NavButtons(props){

    return(
        <Layout>
          <Title>{props.tagName}</Title>
            <RecipyCardDiv> 
                {Object.entries(props.contents).map(Recipy =>
                    <Link key={Recipy[1].title} href="/recipe/[id]" as={'/recipe/' + Recipy[0]}>
                        <a>
                            <RecipyCard title= {Recipy[1].title} desc={Recipy[1].description}/>
                        </a>
                    </Link>
                )}
            </RecipyCardDiv> 
        </Layout>

    )


}





export const getServerSideProps = async ({ query }) => {
    let content = {}
    await fire.database()
    .ref(`TagInfo/${query.tag}`).once('value').then(function(snapshot) {
       return (snapshot.val());
    }).then(result => {
        content = result  
    });
    
    return {
      props: {
        contents: content,
        tagName: query.tag,
      }
    }
  }