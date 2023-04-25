import React from "react";
import "../App.css";
import "./MenuBrowse.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MenuList from "../components/MenuList";
import { Button } from "@mui/material";

import {ReactComponent as Bookmark} from "../assets/icons/bookmark.svg";
import {ReactComponent as Back} from "../assets/icons/chevron-left.svg";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { firebaseConfig, auth } from "./firebase";

const Menu = () => {
  const navigate = useNavigate();

  const [menuTitle, setMenuTitle] = useState("");
  const [save, setSaved] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveMenu = () => {
    handleClose();
    if(!auth || !auth.currentUser){
      alert("Please login to save your menu");
      return;
    }
    setSaved(!save);
    let send = {name: menuTitle, items: JSON.parse(window.localStorage.getItem("items"))};
    setMenuTitle("");
    return fetch(`${firebaseConfig.databaseURL + "/" + auth.currentUser.uid}/menus.json`, {
      method: "POST",
      body: JSON.stringify(send)
    }).then((res) => {
      if (res.status !== 200) {
        console.log(res.statusText);
        // throw new Error(res.statusText);
      } else {
        return;
      }
    });
  }

  return (
    <div>
      <Header back='/home' Right= {Bookmark} rightOnClick = {handleClickOpen}  rightStyle= {`w-8 h-8 ${
              save ? "fill-[#FEE135]" : ""
            } stroke-[#FEE135]`}/>
      <div className="your-menu-wrapper">
        
        <div className="your-menu-title-wrapper">
          <h1>Your Menu</h1>
        </div>
        <MenuList recipes={Object.values(JSON.parse(window.localStorage.getItem("items")))} />
        <Button
          onClick={() => {
            navigate("/schedule");
          }}
          className="menuGenerate"
          variant="contained"
          fullWidth>
          Generate Schedule
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Menu</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setMenuTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveMenu}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Menu;
