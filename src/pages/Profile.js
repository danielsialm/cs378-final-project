import React from "react";
import Header from "../components/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import "./Profile.css";
import { auth, logout } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const database = "https://cookyourway-hci-default-rtdb.firebaseio.com/";

  const getData = () => {
    fetch(`${database + "/" + auth.currentUser.uid}/.json`)
      .then((res) => {
        if (res.status !== 200) {
          // throw new Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((res) => {
        if (res) {
          //should set data here somewhere
        }
      });
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    getData();
  }, [user, loading, navigate]);

  return (
    <>
      <Header back="/home" />
      <div className="space-y-4 mx-8">
        <div>
          <h1 className="text-4xl font-bold mb-8">Your Profile</h1>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Your Email: {user?.email}
          </h2>
        </div>

        <Button
          onClick={() => {
             window.localStorage.clear()
             logout()}}
          className="logout-button"
          fullWidth
          variant="contained">
          Logout
        </Button>
      </div>
    </>
  );
};

export default Profile;
