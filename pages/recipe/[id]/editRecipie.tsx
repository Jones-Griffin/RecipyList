import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "../../../src/components/molecules/Layout";
import { MainDiv } from "../new-recipe";
import fire from "../../../config/fire-config";
import { CreateRecipy, RecipieProps } from "../../../src/components/molecules/createRecipy";
import { useAuthSelector } from "../../../src/context/AuthUserContext";
import { useRouter } from "next/router";

const EditRecipie = (props) => {
  const authUser = useAuthSelector((s) => s.authUser);
  const loading = useAuthSelector((s) => s.loading);
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  return (
    <Layout>
      <Head>
        <title>{props.recipie.title}</title>
      </Head>
      <MainDiv>
        {!authUser ? (
          <p>you must be logged in in to perform this function</p>
        ) : (
          <CreateRecipy tags={props.Tags} recipie={props.recipie} />
        )}
      </MainDiv>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  let content: RecipieProps = { id: query.id };
  const otherContent = { Tags: "", User: "" };
  await fire
    .database()
    .ref(`Recipies/${query.id}`)
    .once("value")
    .then(function (snapshot) {
      return snapshot.val();
    })
    .then((result) => {
      const recipe = { ...result };
      delete recipe.user;
      otherContent.User = result.user;
      content = recipe;
      content.id = query.id;
    });

  await fire
    .database()
    .ref(`Tags`)
    .once("value")
    .then(function (snapshot) {
      return snapshot.val();
    })
    .then((result) => {
      otherContent.Tags = result;
    });

  return {
    props: {
      recipie: content,
      user: otherContent.User,
      Tags: otherContent.Tags,
    },
  };
};

export default EditRecipie;
