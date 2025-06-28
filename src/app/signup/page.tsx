"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Page() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [disabledButton, setDisabledButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/users/signup`, user);
      console.log("sign up successful", response.data);

      router.push("/login");
    } catch (error) {
      console.log("Sign up failed");
    }
  };

  useEffect(() => {
    if (user.password.length > 0 && user.email.length > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "processing" : "Sign Up"}</h1>
      <label htmlFor="username">username</label>
      <input
        className="border-2 border-gray-500"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <label htmlFor="email">Email</label>
      <input
        className="border-2 border-gray-500"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password">password</label>
      <input
        className="border-2 border-gray-500"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onSignUp}
      >
        {disabledButton ? "Fill the goddamn form" : "SignUp"}
      </button>
    </div>
  );
}
