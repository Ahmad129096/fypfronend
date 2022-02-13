import React from "react";
import { Form, Input, TextArea, Button } from "semantic-ui-react";
import Swal from "sweetalert2";
import {  Grid } from "@mui/material";
import emailjs from "emailjs-com";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./service.css";
import MiniBar from '../../components/organism/MiniBar';
import NavBar from '../../components/organism/NavBar';

let Services = () => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  let token = localStorage.getItem("token");
  let decode = jwtDecode(token);

  const SERVICE_ID = "service_irk8xwe";
  const TEMPLATE_ID = "template_90v9bgp";
  const USER_ID = "user_86oO929Fae4ISFIR5CWWo";

  const handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then(
      (result) => {
        console.log(result.text);
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully",
        });
      },
      (error) => {
        console.log(error.text);
        Swal.fire({
          icon: "error",
          title: "Ooops, something went wrong",
          text: error.text,
        });
      }
    );
    e.target.reset();
  };
  let getUser = () => {
    axios
      .get(`http://localhost:5000/api/users/${decode._id}`, {
        headers: { Authorization: token },
      })
      .then(function (response) {
        setName(response.data.data.name);
        setEmail(response.data.data.email);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Grid item md={12}>
             <MiniBar/>
             <NavBar/>
         </Grid>
  
    <div className="container">
      <div className="content">
        <div className="left-side">
          <div className="address details">
            <i className="fas fa-map-marker-alt"></i>
            <div className="topic">Address</div>
            <div className="text-one">main bazar</div>
            <div className="text-two">johar town 06</div>
          </div>
          <div className="phone details">
            <i className="fas fa-phone-alt"></i>
            <div className="topic">Phone</div>
            <div className="text-one">0317-4284732</div>
            <div className="text-two"></div>
          </div>
          <div className="email details">
            <i className="fas fa-envelope"></i>
            <div className="topic">Email</div>
            <div className="text-one">PetChase@gmail.com</div>
            <div className="text-two"></div>
          </div>
        </div>
        <div className="right-side">
          <div className="topic-text">Send us a message</div>
          <p>
            If you have any query related to website or you want to report a
            user. you can send us a message
          </p>
          <form onSubmit={handleOnSubmit}>
            <div className="input-box">
              <input
                id="form-input-control-last-name"
                type="text"
                label="Name"
                name="user_name"
                required
                value={name}
              />
            </div>
            <div className="input-box">
              <input
              id="form-input-control-email"
                type="text"
                label="Email"
                name="user_email"
                required
                value={email}
              />
            </div>
            <div className="input-box message-box">
              <textarea
              id='form-textarea-control-opinion'
                label="Message"
                name="user_message"
                placeholder="Enter Your Message here"
                required
              />
            </div>
            <div>
              <button type="submit" className="btn btn1">
                Send Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Services;
