import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import fire from "../../../config/fire-config";
import { Header } from "../../components/atoms/Header";

export const Register = () => {
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
        console.error(err.code, err.message);
      });
    router.push("/");
  };
  return (
    <>
      <Header
        pageTitle={"Create new user"}
        showHeaderButton={true}
        headerButton={<Link href={`/`}>Back</Link>}
      />
      {notification}
      <form onSubmit={handleLogin}>
        Email:&nbsp;
        <input
          type="text"
          value={userName}
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
        Confirm password:&nbsp;
        <input
          type="password"
          value={passConf}
          onChange={({ target }) => setPassConf(target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
};
