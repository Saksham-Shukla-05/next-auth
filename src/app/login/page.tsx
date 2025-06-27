"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Page() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [disabledButton, setDisabledButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/users/login`, user);
      console.log("logged in successful", response.data);

      router.push("/profile");
    } catch (error) {
      console.log("log in failed");
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
      <h1>{loading ? "processing" : "Log in"}</h1>

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
        onClick={onLogin}
      >
        {disabledButton ? "Fill the goddamn form" : "LogIn"}
      </button>
    </div>
  );
}
