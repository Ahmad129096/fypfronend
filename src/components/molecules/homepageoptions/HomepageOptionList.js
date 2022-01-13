import React from "react";
import { Button, Link } from "@mui/material";
import DropDown from "../../atoms/DropDown";
import { useHistory, NavLink } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import en from "../../../locale/eng.json";
import de from "../../../locale/de.json";
import './index.css'

const HomePageList = () => {
  let t = localStorage.getItem('lang') === 'en' ? en : de;
    const [int, setInt] = React.useState(t);
    let token = localStorage.getItem("token");
    let list = [
        {title:`${int.categories}`},
        {title:'Ready to ship'},
        {title:'Wishlist'},
        {title:'Services & Help'},
        {title:'Blogs'},
    ]
  const history = useHistory();
  return (
    <ul
      style={{
        display: "flex",
        listStyle: "none",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#a3a19d",
        width: "900",
        height: 60,
      }}
    >
      
      <li style={{ color: "black",fontFamily: "serif", fontSize: 20  }}>
        <DropDown title={list[0].title} />
      </li>

      <li>
        <Button
          style={{ color: "black",fontFamily: "serif", fontSize: 20  }}
          onClick={() => {
            token ? history.push("/wishlist") : history.push("/login");
          }}
        >
          {int.wishlist}
        </Button>
      </li>
      <li>
        <Button
          style={{ color: "black", fontFamily: "serif", fontSize: 20 }}
          onClick={() => {
            token ? history.push("/services") : history.push("/login");
          }}
        >
          {int.service}
        </Button>
      </li>

      <li>
        <Button
          style={{ color: "black",fontFamily: "serif", fontSize: 20  }}
          onClick={() => {
            token ? history.push("/vendor") : history.push("/login");
          }}
        >
          {int.post}
        </Button>
      </li>
    </ul>
  );
};

export default HomePageList;
