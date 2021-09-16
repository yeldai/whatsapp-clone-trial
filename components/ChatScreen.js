import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useCollection} from "react-firebase-hooks/firestore";
import Message from "../components/Message";
import {  InsertEmoticon, Mic } from "@material-ui/icons";
import { useState,useRef } from "react";
import firebase from "firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from 'react-timeago'



function ChatScreen({chat,messages}) {
   
  
console.log(<TimeAgo datetime={recipient?.lastSeen?.toDate()}/>)
    const [user]=useAuthState(auth);
    const [input,setInput]=useState("");
    const endOfMessagesRef=useRef(null);
    const router = useRouter();
    const [messagesSnapshot]= useCollection(db
        .collection('chats')
        .doc(router.query.id)
        .collection('messages')
        .orderBy('timestamp','asc'));
    const [recipientSnapshot]= useCollection(
        db.collection("users").where("email","==",getRecipientEmail(chat.users,user)))

    const showMessages = ()=> {
        if(messagesSnapshot){
            return messagesSnapshot.docs.map(message=>(
                <Message
                key={message.id}
                user={message.data().user}
                message={{
                    ...message.data(),
                    timestamp:message.data().timestamp?.toDate().getTime(),
                }}
                /> 
            )

            )
        }else{
            return JSON.parse(messages).map(message=>(
                <Message key={message.id} user={message.user} message={message} />
            ))
        }
    }

const scrollToBottom=()=>{
    endOfMessagesRef.current.scrollIntoView({
        behavior:"smooth",
        block:"start",
    })
}
const sendMessage = (e)=>{
e.preventDefault();

db.collection("users").doc(user.uid).set({
    lastSeen:firebase.firestore.FieldValue.serverTimestamp(),

},{merge:true})

db.collection("chats").doc(router.query.id).collection("messages").add({
    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
    message:input,
    user:user.email,
    photoUrl:user.photoURL,
    
})
setInput("");
scrollToBottom();
};

const recipient=recipientSnapshot?.docs?.[0]?.data();
const recipientEmail= getRecipientEmail(chat.users,user);

    return (
        <Container>
          <Header>
              {recipient ? (
                <Avatar src ={recipient?.photoURL}/>
              ):(
                  <Avatar>{recipientEmail[0]}</Avatar>
              )}
            

     <HeaderInformation>
            <h3>{recipientEmail}</h3>
            {recipientSnapshot ? (
            <p>
            Last active: {" "}
            {recipient?.lastSeen?.toDate()?(
                <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
            ): (
                "Unavailable"
            )}
            </p>
            ):(
        <p>Loading last active...</p>
    )}
        
            </HeaderInformation>
            
        <HeaderIcons> 
            <IconButton>
<AttachFileIcon/>
            </IconButton>
            <IconButton>
<MoreVertIcon/>
            </IconButton>

        </HeaderIcons>
          </Header>
          <MessageContainer>
              {showMessages()}
              <EndofMessage ref={endOfMessagesRef}/>
          </MessageContainer>
          <InputContainer>
          <InsertEmoticon/>
          <Input value={input} onChange={e=>setInput(e.target.value)}/>
          <button hidden disabled={!input} type="submit" onClick={sendMessage}> Send Message</button>
          <Mic/>
          </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container= styled.div`

`;

const Header = styled.div`
position:sticky;
background-color:white;
z-index:100;
top:0;
display:flex;
padding:11px;
height:80px;
align-items:center;
border-bottom:1px solid whitesmoke;
`;

const HeaderInformation= styled.div`
margin-left:15px;
flex:1;

>h3{
    margin-bottom:3px;
}


>p{
    font-size:14px;
    color:gray;
}
`;

const HeaderIcons= styled.div``;
const Input= styled.input`
flex:1;
align-items:center;
position:sticky;
padding:20px;
background-color:whitesmoke;
bottom:0;
margin-left:15px;
margin-right:15px;
outline:none;
border:none;
border-radius:100px;


`;



const MessageContainer= styled.div`
padding:30px;
background-image:url("https://i.pinimg.com/564x/ab/ab/60/abab60f06ab52fa7846593e6ae0c9a0b.jpg");
min-height:90vh;
overflow-y:scroll;
::-webkit-scrollbar{
    display:none;
}


`;

const EndofMessage = styled.div`
margin-bottom:50px;
`;

const InputContainer= styled.form`
display:flex;
align-items:center;
padding:10px;
position:sticky;
bottom:0;
background-color:white
z-index:100;



`;