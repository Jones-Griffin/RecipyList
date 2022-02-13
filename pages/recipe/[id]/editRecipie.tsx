import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "../../../src/components/molecules/Layout";
import { MainDiv } from "../new-recipe";
import fire from "../../../config/fire-config";
import {
  CreateRecipe,
  RecipeProps,
} from "../../../src/components/molecules/createRecipe";
import { useAuthSelector } from "../../../src/context/AuthUserContext";
import { useRouter } from "next/router";

const EditRecipe = (props) => {
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
        <title>{props.recipe.title}</title>
      </Head>
      <MainDiv>
        {!authUser ? (
          <p>you must be logged in in to perform this function</p>
        ) : (
          <CreateRecipe tags={props.Tags} recipe={props.recipe} />
        )}
      </MainDiv>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  let content: RecipeProps = { id: query.id };
  const otherContent = { Tags: "", User: "" };
  await fire
    .database()
    .ref(`recipes/${query.id}`)
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
      recipe: content,
      user: otherContent.User,
      Tags: otherContent.Tags,
    },
  };
};

export default EditRecipe;
