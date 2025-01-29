import React from "react";
import Search from "../search/Search.jsx";
import UserList from "./user-list/UserList.jsx";
import Pagination from "../pagination/Pagination.jsx";

export default function UserSection() {
  return (
    <>
      <section className="card users-container">
        <Search />

        {/* <!-- Table component --> */}
        <UserList />

        {/* <!-- New user button  --> */}
        <button className="btn-add btn">Add new user</button>

        {/* <!-- Pagination component  --> */}
        <Pagination />
      </section>
    </>
  );
}
