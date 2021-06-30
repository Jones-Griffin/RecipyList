// pages/login/register.js
import { useState } from "react";
import fire from "../../config/fire-config";
import { useRouter } from "next/router";
import Layout from "../../components/molecules/Layout";
import styled from "styled-components";
import Head from "next/head";

const Title = styled.h1`
  @media (max-width: 875px) {
    margin-top: 57px;
  }
`;

const Register = () => {
  const router = useRouter();

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passConf, setPassConf] = useState("");

  const [notification, setNotification] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (password !== passConf) {
      setNotification("Password and password confirmation does not   match");
      setTimeout(() => {
        setNotification("");
      }, 2000);
      setPassword("");
      setPassConf("");
      return null;
    }
    fire
      .auth()
      .createUserWithEmailAndPassword(userName, password)
      .catch((err) => {
        console.log(err.code, err.message);
      });
    router.push("/");
  };
  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <Title>Create new user</Title>

      {notification}

      <form onSubmit={handleLogin}>
        Email:{" "}
        <input
          type="text"
          value={userName}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        Password conf:{" "}
        <input
          type="password"
          value={passConf}
          onChange={({ target }) => setPassConf(target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </Layout>
  );
};
export default Register;
