import Head from "next/head";
import fire from "../config/fire-config";
import Link from "next/link";

import Layout from "../src/components/molecules/Layout";
import { RecipyCard } from "../src/components/molecules/RecipyCard";
import RecipyCardDiv from "../src/components/molecules/RecipyCardStyling";
import { Header } from "../src/components/atoms/Header";

interface Props {
  Recipes: any[];
}

const Home = (props: Props) => {
  return (
    <div>
      <Head>
        <title>Recipe App</title>
      </Head>
      <Layout>
        <Header pageTitle={"Recipes"} />
        <RecipyCardDiv>
          {Object.entries(props.Recipes).map((Recipy) => (
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
  const recipes = await fire
    .database()
    .ref(`Recipies`)
    .limitToLast(15)
    .once("value")
    .then(function (snapshot) {
      return snapshot.val();
    })
    .then((result) => {
      return result;
    });

  return {
    props: {
      Recipes: recipes,
    },
  };
};
export default Home;
