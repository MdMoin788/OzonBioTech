import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "../components/Input";

export const Profile = () => {
  const { user } = useSelector((state) => state.user);
  console.log("user from profile", user);
  const [edit, setEdit] = useState(false);
  const [updateUser, setUpdateUser] = useState();
  const handleClick = () => {
    setEdit(!edit);
  };
  useEffect(() => {
    setUpdateUser(user);
    return () => {
    }
  }, [updateUser, user])
  
  const handleChanage = (e) => {
    const {name, value} = e.target
    setUpdateUser({ ...updateUser, [name]: value })
    
  };
  return (
    <div className="profile">
      <div className="heading">
        <h3>Personal Information</h3>
        <button onClick={handleClick}>{edit ? "Save" : "Edit"}</button>
      </div>
      <div className="profile-detail">
        <Input
          handleChanage={handleChanage}
          option={{
            heading: "Name :",
            type: "text",
            name: "name",
            value: user?.name,
            placeholder: user?.name,
            readOnly: edit
          }}
        />
        <Input
          handleChanage={handleChanage}
          option={{
            heading: "Email :",
            type: "email",
            name: "email",
            value: user?.email,
            placeholder: user?.email,
            readOnly: edit
          }}
        />
      </div>
    </div>
  );
};
