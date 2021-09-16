import styled from "styled-components";
import Head from "next/head";
import { Button } from '@material-ui/core';
import { auth,provider} from "../firebase";
function Login() {

const signIn= ()=>{
    auth.signInWithPopup(provider).catch(alert);
}
    return (
        <Container>
            <Head>
            <title>Login</title>
          
            </Head>


            <LoginContainer>
                <Logo 
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"/>
                <Button onClick={signIn} variant="outlined"> Sign in </Button>

            </LoginContainer>
            
        </Container>
    )
}

export default Login

const Container = styled.div`
display:grid;
place-items:center;
height:100vh;
background-color:whitesmoke;


`;

const LoginContainer = styled.div`
padding:100px;
display:flex;
flex-direction:column;
align-items:center;
background-color:white;
border-radius:5px;
box-shadow:0px 12px 14px -3px rgba(0,171,0,0.8)


`;

const Logo = styled.img`
height:200px;
width:200px
margin-bottom:50px;
`