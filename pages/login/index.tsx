import Layout from "../../src/components/molecules/Layout";
import { Login } from "../../src/pages/login";
import Head from "next/head";

const SignIn = () => {
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <Login />
    </Layout>
  );
};
export default SignIn;
