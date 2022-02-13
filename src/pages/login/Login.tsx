import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import fire from "../../../config/fire-config";
import { Header } from "../../components/atoms/Header";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotification] = useState("");
  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(username, password)
      .catch((err) => {
        console.error(err.code, err.message);
        setNotification(err.message);
        setTimeout(() => {
          setNotification("");
        }, 2000);
      });
    setUsername("");
    setPassword("");
    router.push("/");
  };
  return (
    <>
      <Header
        pageTitle={"Login"}
        showHeaderButton={true}
        headerButton={<Link href={`/`}>Back</Link>}
      />
      {notify}
      <form onSubmit={handleLogin}>
        Email:&nbsp;
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        Password:&nbsp;
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
};
