import Head from "next/head";
import fire from "../../config/fire-config";
import Link from "next/link";

import Layout from "../../components/molecules/Layout";
import { RecipyCard } from "../../components/molecules/RecipyCard";
import RecipyCardDiv from "../../components/molecules/RecipyCardStyling";
import { Header } from "../../components/atoms/Header";

const Tags = (props) => {
  return (
    <div>
      <Head>
        <title>Tags</title>
      </Head>
      <Layout>
        <Header pageTitle={"Tags"} />
        <RecipyCardDiv>
          {Object.entries(props.Recipe).map((Recipy) => (
            <Link key={Recipy[0]} href="/tags/[tag]" as={"/tags/" + Recipy[0]}>
              <a>
                <RecipyCard title={Recipy[0]} description={""} />
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
    .ref(`Tags`)
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
export default Tags;
