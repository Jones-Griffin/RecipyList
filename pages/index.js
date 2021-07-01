import Head from "next/head";
import fire from "../config/fire-config";
import Link from "next/link";

import Layout from "../components/molecules/Layout";
import { RecipyCard } from "../components/molecules/RecipyCard";
import RecipyCardDiv from "../components/molecules/RecipyCardStyling";
import { Header } from "../components/atoms/Header";

const Home = (props) => {
  return (
    <div>
      <Head>
        <title>Recipe App</title>
      </Head>
      <Layout>
        <Header pageTitle={"Recipies"} />
        <RecipyCardDiv>
          {Object.entries(props.Recipe).map((Recipy) => (
            <Link
              key={Recipy[0]}
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
};

export const getServerSideProps = async () => {
  const content = {};
  await fire
    .database()
    .ref(`Recipies`)
    .limitToLast(15)
    .once("value")
    .then(function (snapshot) {
      return snapshot.val();
    })
    .then((result) => {
      content["RecipyCards"] = result;
    });

  return {
    props: {
      Recipe: content.RecipyCards,
    },
  };
};
export default Home;
