"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  username?: string;
};

function Profile() {
  const router = useRouter();
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

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("logged out");
      router.push("/login");
    } catch (error) {}
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h1>{user.username}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Profile;
