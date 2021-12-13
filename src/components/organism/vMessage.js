import { Avatar, Divider, Grid, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import NavBar from './NavBar';
import jwtDecode from 'jwt-decode';

let VMessage = () => {

  let token = localStorage.getItem("vendorToken") ;
  let user = jwtDecode(token);
  let userId = user._id;
  console.log(userId)
  let [chatId, setChatId] = useState('');
  //let chatId = "61acf291eb58a1399018e0e1";
  let [message, setMessage] = useState('');
  let [chat, setChat] = useState([]);
  let [allChat,setAllChat] = useState([]);

  console.log(userId)
  let handleMessage = (e) => {
    setMessage(e.target.value)
  }

 /* const onMessageSubmit = (e) => {
    const {name,message} = message;

  }*/


  let allChats = () =>{
    axios.get('http://localhost:5000/api/chats', {headers:{'Authorization':token}})
    .then((response)=>{
      setAllChat(response.data.data.filter(t=> userId === t.vendor._id));
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  let getChat = (id) =>{
    let tid = id;
    var myVar = setInterval(()=>{
        console.log('clicked')
        setChatId(id);
        axios.get('http://localhost:5000/api/chats', {headers:{'Authorization':token}})
        .then((response)=>{
          let array = response.data.data.filter(t=> t._id === tid)
          setChat(array[0].messages)
        })
        .catch((error)=>{
          console.log(error)
        })
    },5000)

  }



  let sendMessage = () =>{
    let obj = {
      vendor:userId,
      chatId:chatId,
      text:message,
    }
    axios.post('http://localhost:5000/api/messages',obj, {headers:{'Authorization':token}})
    .then((response)=>{
      console.log('message sent');
    })
    .catch((error)=>{
      console.log(error)
    })
    setMessage('');
  }

  useEffect(()=>{
     allChats();
  },[])

  console.log(allChat)

  let arr = [1,2,3,4,5,6]
  return(
  <Grid container spacing={3}>
  <Grid item md={12}>
    <NavBar/>
  </Grid>
  <Grid item md={12}>
    <Typography variant="h5" style={{textAlign:'center'}}>
         Your Messages
    </Typography>
  </Grid>
  <Grid item md={2}>
    <div style={{textAlign:'center'}}>
      Message List
      </div>
      <div style={{marginLeft:20}}>
    {allChat.map((item)=>{
      return(
        <div onClick={()=>getChat(item._id)} style={{marginTop:10,display:'flex',borderBottom:'1px solid black'}}>
        <Avatar/>
        <div style={{marginLeft:20,marginTop:10,marginBottom:20}}>
          {item?.user?.name}
          </div>
          <Divider/>
        </div>
      )
    })}
   </div>
  </Grid>
  <Grid item md={9}>
    <div style={{marginLeft:20,border:'1px solid black',height:500}}>
    <div style={{textAlign:'center',borderBottom:'1px solid grey',marginTop:15,marginBottom:15}}>
      You are now connected with Buyer.
      </div>
      <div style={{marginTop:50}}>
        {
           chat?.map((info,index)=>(
            <div key={index} >
              <Typography variant="h6" style={{marginTop:10,textAlign:`${info?.vendor?.name ? 'start':'right'}`}}>
              {info?.vendor?.name ? 'You:': ''} <span style={{backgroundColor:`${info?.vendor?.name ? '#91c775': '#44adbd'}`,borderRadius:'33px',padding:5}}> {info?.text} </span> {info?.vendor?.name ? '': ':Buyer'}
                {console.log('hehe',info?.vendor?.name)}
              </Typography>
            </div>
          ))
        }
        </div>
    </div>
    <div style={{marginLeft:20,display:'flex',marginTop:10}}>
    <TextField
    fullWidth
    label="Enter a message."
    value={message}
    onChange={handleMessage}
    />
    <Button 
    disabled={message.length === 0 ? true:false}
    onClick={sendMessage} style={{marginLeft:20}} variant="outlined">
      Send
      </Button>
    </div>
  </Grid>
  </Grid>
  )
}

export default VMessage;