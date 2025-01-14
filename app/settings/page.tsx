/* eslint-disable prettier/prettier */
"use client";

import { useState, useEffect } from "react";

import api from "@/api/api";
import UserForm from "@/components/UserForm";
import UserList from "@/components/UserList";

interface User {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users", err));
  }, []);

  const addUser = async (user: {
    name: string;
    phoneNumber: string;
    email: string;
  }) => {
    try {
      const res = await api.post("/users", user);

      setUsers((prev) => [...prev, res.data.user]);
    } catch (err) {
      console.error("Failed to add user", err);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  return (
    <section className="flex flex-col max-w-4xl mx-auto items-center justify-center gap-4 py-8 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-4">User Manager</h1>
      <UserForm onSubmit={addUser} />
      <UserList users={users} onDelete={deleteUser} />
    </section>
  );
};

export default UsersPage;
