import Head from "next/head";
import fire from "../../config/fire-config";
import Link from "next/link";

import Layout from "../../src/components/molecules/Layout";
import { RecipyCard } from "../../src/components/molecules/RecipyCard";
import RecipyCardDiv from "../../src/components/molecules/RecipyCardStyling";
import { Header } from "../../src/components/atoms/Header";

const Tags = (props) => {
  return (
    <div>
      <Head>
        <title>Tags</title>
      </Head>
      <Layout>
        <Header pageTitle={"Tags"} />
        <RecipyCardDiv>
          {Object.entries(props.tags || []).map((tag) => (
            <Link key={tag[0]} href="/tags/[tag]" as={"/tags/" + tag[0]}>
              <a>
                <RecipyCard title={tag[0]} description={""} />
              </a>
            </Link>
          ))}
        </RecipyCardDiv>
      </Layout>
    </div>
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
      tags: tags,
    },
  };
};
export default Tags;
