// pages/users/login.js
import { useState } from 'react';
import fire from '../../config/fire-config';
import { useRouter } from 'next/router'
import Layout from '../../components/molecules/Layout'
import styled from 'styled-components'
import Head from 'next/head';

const Title = styled.h1`
@media(max-width: 875px){
  margin-top: 57px;
}
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotification] = useState('');
  const router = useRouter();  
  const handleLogin = (e) => {
    e.preventDefault();    
    fire.auth()
      .signInWithEmailAndPassword(username, password)
      .catch((err) => {
        console.log(err.code, err.message)
        setNotification(err.message)        
        setTimeout(() => {
          setNotification('')
        }, 2000)
      })    
      setUsername('')
    setPassword('')
    router.push("/")  }  
    return (
    <Layout>
                <Head>
            <title>Login</title>
          </Head>
      <Title>Login</Title>
      {notify}
      <form onSubmit={handleLogin}>
        Email<input type="text" value={username} 
        onChange= {({target}) => setUsername(target.value)} />
        <br />
        Password<input type="password" value={password} 
        onChange={({target}) => setPassword(target.value)} />
        <br />
        <button type="submit">Login</button>
      </form>
    </Layout>
  )
}
export default Login