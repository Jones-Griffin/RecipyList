// import fire from '../config/fire-config';
import Link from "next/link";
import styled from "styled-components";

import Layout from "../../components/molecules/Layout";
import { CreateRecipy } from "../../components/molecules/createRecipy";
import { useState } from "react";
import fire from "../../config/fire-config";
import Head from "next/head";

export const MainDiv = styled.div`
  @media (max-width: 875px) {
    margin-top: 57px;
  }
`;
const NewRecipy = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <Layout>
      <Head>
        <title>New Recipe</title>
      </Head>
      <MainDiv>
        {!loggedIn ? (
          <p>you must be loggin in to perform this function</p>
        ) : (
          <CreateRecipy tags={props.Tags} />
        )}
      </MainDiv>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const content = {};
  await fire
    .database()
    .ref(`Tags`)
    .once("value")
    .then(function (snapshot) {
      return snapshot.val();
    })
    .then((result) => {
      content["Tags"] = result;
    });

  return {
    props: {
      Tags: content.Tags,
    },
  };
};

export default NewRecipy;
