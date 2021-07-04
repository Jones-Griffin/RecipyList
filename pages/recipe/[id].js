import fire from "../../config/fire-config";
import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";

import Layout from "../../components/molecules/Layout";
import { Header } from "../../components/atoms/Header";

const Recipe = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  fire.auth().onAuthStateChanged((user) => {
    if (user && props.user && user.uid === props.user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <Layout>
      <Head>
        <title>{props.Title}</title>
      </Head>
      <Header
        pageTitle={props.Title}
        showHeaderButton={loggedIn}
        headerButton={
          <Link href={`/recipe/${props.recipeId}/editRecipie`}>Edit</Link>
        }
      />
      <h3>Ingredients</h3>
      <ul>
        {Object.entries(props.Ingredients).map((ingree) => {
          if (!ingree[1]) {
            return;
          }
          return <li key={ingree[0]}>{ingree[1]}</li>;
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
  const content = {};
  await fire
    .database()
    .ref(`Recipies/${query.id}`)
    .once("value")
    .then(function (snapshot) {
      return snapshot.val();
    })
    .then((result) => {
      content["Title"] = result.title;
      content["Ingredients"] = result.Ingredients;
      content["Method"] = result.Method;
      content["user"] = result.user;
    });

  return {
    props: {
      Title: content.Title,
      Method: content.Method,
      Ingredients: content.Ingredients,
      user: content.user || "",
      recipeId: query.id,
    },
  };
};
export default Recipe;
