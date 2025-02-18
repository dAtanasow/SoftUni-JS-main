import React, { useEffect, useState } from "react";
import Search from "../search/Search.jsx";
import UserList from "./user-list/UserList.jsx";
import Pagination from "../pagination/Pagination.jsx";
import UserAdd from "./user-add/UserAdd.jsx";
import UserDetails from "./user-details/UserDetails.jsx";
import UserDelete from "./user-delete/UserDelete.jsx";

const baseURL = "http://localhost:3030/jsonstore";

export default function UserSection(props) {
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showUserDetailsById, setShowUserDetailsById] = useState(null);
  const [showUserDelete, setShowUserDelete] = useState(null);

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

  const addUserClickHandler = () => {
    setShowAddUser(true);
  };

  const addUserCloseHandler = () => {
    setShowAddUser(false);
  };

  const addUserSaveHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = {
      ...Object.fromEntries(formData),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const response = await fetch(`${baseURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const createdUser = await response.json();

    setUsers((oldUsers) => [createdUser, ...oldUsers]);

    setShowAddUser(false);
  };

  const userDetailsClickHandler = (userId) => {
    setShowUserDetailsById(userId);
  };

  const userDeleteClickHandler = (userId) => {
    setShowUserDelete(userId);
  };
  const userDeleteHandler = async (userId) => {
    const response = await fetch(`${baseURL}/users/${userId}`, {
      method: "DELETE",
    });

    setUsers((oldUsers) => oldUsers.filter((user) => user._id !== userId));
    setShowUserDelete(null);
  };

  return (
    <>
      <section className="card users-container">
        <Search />
        <UserList
          users={users}
          onUserDetailsClick={userDetailsClickHandler}
          onUserDeleteClick={userDeleteClickHandler}
        />
        {showAddUser && (
          <UserAdd onClose={addUserCloseHandler} onSave={addUserSaveHandler} />
        )}
        {showUserDetailsById && (
          <UserDetails
            user={users.find((user) => user._id == showUserDetailsById)}
            onClose={() => setShowUserDetailsById(null)}
          />
        )}
        {showUserDelete && (
          <UserDelete
            onClose={() => setShowUserDelete(null)}
            onUserDelete={() => userDeleteHandler(setShowUserDelete)}
          />
        )}
        <button className="btn-add btn" onClick={addUserClickHandler}>
          Add new user
        </button>
        <Pagination />
      </section>
    </>
  );
}
