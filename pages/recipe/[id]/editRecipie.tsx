import React, { useState } from "react";
import fire from "../../../config/fire-config";
import Head from "next/head";
import Layout from "../../../components/molecules/Layout";
import {
  CreateRecipy,
  RecipieProps,
} from "../../../components/molecules/createRecipy";
import { MainDiv } from "../new-recipe";

const EditRecipie = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  fire.auth().onAuthStateChanged((user) => {
    if (user && user.uid === props.user && props.user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <Layout>
      <Head>
        <title>{props.recipie.title}</title>
      </Head>
      <MainDiv>
        {!loggedIn ? (
          <p>you must be loggin in to perform this function</p>
        ) : (
          <CreateRecipy tags={props.Tags} recipie={props.recipie} />
        )}
      </MainDiv>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  let content: RecipieProps = { id: query.id };
  await fire
    .database()
    .ref(`Recipies/${query.id}`)
    .once("value")
    .then(function (snapshot) {
      return snapshot.val();
    })
    .then((result) => {
      delete result.user;
      content = result;
      content.id = query.id;
    });

  const tags = { Tags: "" };
  await fire
    .database()
    .ref(`Tags`)
    .once("value")
    .then(function (snapshot) {
      return snapshot.val();
    })
    .then((result) => {
      tags["Tags"] = result;
    });

  return {
    props: {
      recipie: content,
      Tags: tags.Tags,
    },
  };
};

export default EditRecipie;
