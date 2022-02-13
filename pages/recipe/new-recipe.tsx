// import fire from '../config/fire-config';
import styled from "styled-components";

import Layout from "../../src/components/molecules/Layout";
import { CreateRecipe } from "../../src/components/molecules/createRecipe";
import { useEffect } from "react";
import fire from "../../config/fire-config";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuthSelector } from "../../src/context/AuthUserContext";

export const MainDiv = styled.div`
  @media (max-width: 875px) {
    margin-top: 57px;
  }
`;
const NewRecipe = (props) => {
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
        <title>New Recipe</title>
      </Head>
      <MainDiv>
        {!authUser ? (
          <p>you must be logged in in to perform this function</p>
        ) : (
          <CreateRecipe tags={props.Tags} />
        )}
      </MainDiv>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const tags = await fire
    .database()
    .ref(`Tags`)
    .once("value")
    .then(function (snapshot) {
      return snapshot.val();
    })
    .then((result) => {
      return result;
    });

  return {
    props: {
      Tags: tags,
    },
  };
};

export default NewRecipe;
