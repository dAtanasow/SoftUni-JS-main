import React, { useEffect, useState } from "react";
import Search from "../search/Search.jsx";
import UserList from "./user-list/UserList.jsx";
import Pagination from "../pagination/Pagination.jsx";

const baseURL = "http://localhost:3030/jsonstore";

export default function UserSection(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(`${baseURL}/users`);
        const result = await response.json();
        const users = Object.values(result);
        setUsers(users);
      } catch (err) {
        console.log(err);
      }
    }
    getUsers();
  }, []);

  return (
    <>
      <section className="card users-container">
        <Search />

        <UserList users={users} />

        <button className="btn-add btn">Add new user</button>

        <Pagination />
      </section>
    </>
  );
}
