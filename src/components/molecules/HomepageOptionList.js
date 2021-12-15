import React from "react";
import { Button, Link } from "@mui/material";
import DropDown from "../atoms/DropDown";
import { useHistory, NavLink } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
const HomePageList = () => {
  let token = localStorage.getItem("token");
  let list = [
    { title: "Categories" },
    { title: "Ready to ship" },
    { title: "Wishlist" },
    { title: "Services & Help" },
    { title: "Blogs" },
  ];
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
          Wishlist
        </Button>
      </li>
      <li>
        <Button
          style={{ color: "black", fontFamily: "serif", fontSize: 20 }}
          onClick={() => {
            token ? history.push("/services") : history.push("/login");
          }}
        >
          Services & Help
        </Button>
      </li>

      <li>
        <Button
          style={{ color: "black",fontFamily: "serif", fontSize: 20  }}
          onClick={() => {
            token ? history.push("/vendor") : history.push("/login");
          }}
        >
          Post your pet
        </Button>
      </li>
    </ul>
  );
};

export default HomePageList;
