import fire from "../../config/fire-config";
import Link from "next/link";
import Head from "next/head";

import Layout from "../../components/molecules/Layout";
import { RecipyCard } from "../../components/molecules/RecipyCard";
import RecipyCardDiv from "../../components/molecules/RecipyCardStyling";
import { Header } from "../../components/atoms/Header";



export default function NavButtons(props) {
  return (
    <div>
      <Head>
        <title>{props.tagName}</title>
      </Head>
      <Layout>
      <Header pageTitle={props.tagName} />
        <RecipyCardDiv>
          {Object.entries(props.contents).map((Recipy) => (
            <Link
              key={Recipy[1].title}
              href="/recipe/[id]"
              as={"/recipe/" + Recipy[0]}
            >
              <a>
                <RecipyCard
                  title={Recipy[1].title}
                  description={Recipy[1].description}
                  imgUrl={Recipy[1].imgUrl}
                />
              </a>
            </Link>
          ))}
        </RecipyCardDiv>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  let content = {};
  await fire
    .database()
    .ref(`TagInfo/${query.tag}`)
    .once("value")
    .then(function (snapshot) {
      return snapshot.val();
    })
    .then((result) => {
      content = result;
    });

  return {
    props: {
      contents: content,
      tagName: query.tag,
    },
  };
};
