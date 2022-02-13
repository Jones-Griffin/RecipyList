// pages/login/register.js
import Layout from "../../src/components/molecules/Layout";
import Head from "next/head";
import { Register } from "../../src/pages/login";

const RegisterUser = () => {
  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <Register />
    </Layout>
  );
};
export default RegisterUser;
