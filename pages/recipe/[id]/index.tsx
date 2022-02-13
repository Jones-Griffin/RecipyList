import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useAuthSelector } from "../../../src/context/AuthUserContext";
import Layout from "../../../src/components/molecules/Layout";
import { Header } from "../../../src/components/atoms/Header";
import fire from "../../../config/fire-config";


const Recipe = (props) => {
  const authUser = useAuthSelector((s) => s.authUser);

  return (
    <Layout>
      <Head>
        <title>{props.Title}</title>
      </Head>
      <Header
        pageTitle={props.Title}
        showHeaderButton={!!authUser}
        headerButton={
          <Link href={`/recipe/${props.recipeId}/editRecipie`}>Edit</Link>
        }
      />
      <h3>Ingredients</h3>
      <ul>
        {Object.entries(props.Ingredients).map((ingredient) => {
          if (!ingredient[1]) {
            return;
          }
          return <li key={ingredient[0]}>{ingredient[1]}</li>;
        })}
      </ul>
      <h3>Method</h3>
      <ol>
        {Object.entries(props.Method).map((step) => {
          if (!step[1]) {
            return;
          }
          return <li key={step[0]}>{step[1]}</li>;
        })}
      </ol>
      <Link href="/">
        <a>Back</a>
      </Link>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  const content = await fire
    .database()
    .ref(`Recipies/${query.id}`)
    .once("value")
    .then(function (snapshot) {
      return snapshot.val();
    })
    .then((result) => {
      return {
        Title: result.Title || "",
        Method: result.Method || "",
        Ingredients: result.Ingredients || "",
        user: result.user || "",
      };
    });

  return {
    props: {
      Title: content.Title,
      Method: content.Method,
      Ingredients: content.Ingredients,
      user: content.user,
      recipeId: query.id,
    },
  };
};
export default Recipe;
