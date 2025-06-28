"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

type User = {
  username?: string;
};

function Profile() {
  const [user, setUser] = useState<User>({});
  const getProfile = async () => {
    try {
      const request = await axios.post("/api/users/profile");
      const data = request.data;
      setUser(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h1>{user.username}</h1>
    </div>
  );
}

export default Profile;
