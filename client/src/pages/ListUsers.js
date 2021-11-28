import React from "react";
import { useEffect, useState } from "react";
// import Header from ".../";
import Header from "../components/Header/Header";

function ListUsers() {
  const [users, setUsers] = useState(null);
  //   const onSuccess = async (data) => {
  //     const res = await fetch(`http://localhost:4000/api/v1/auth/`, {
  //       method: "Get",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (res.status === 200) {
  //       console.log("Retrived users");
  //       console.log(result);
  //     } else {
  //       alert("Unable to fetch users.");
  //     }
  //   };

  const getUsers = () => {
    fetch(`http://localhost:4000/api/v1/auth/`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        console.log("Users were fetched!");
        console.log(data);
      });
  };

  function clickAccordion() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }

  useEffect(() => {
    clickAccordion();
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="userWrap">
      <Header />
      <h2>Matador Motorsports Users</h2>

      <button class="accordion">Section 1</button>
      <div class="panel">
        <div className="list-users">
          <div className="user-subheader">
            <span>
              <strong>Name</strong>
            </span>
            <span>
              <strong>Email</strong>
            </span>
            <span>
              <strong>Role</strong>
            </span>
            <span>
              <strong>Team</strong>
            </span>
          </div>
          {users ? (
            users.map((user) => (
              <div className="user">
                <span>
                  {user.firstName} {user.lastName}
                </span>
                <span>{user.email}</span>
                <span>{user.role}</span>
                <span>None</span>
              </div>
            ))
          ) : (
            <h2>Users here</h2>
          )}
          {/* <p>END OF USERS LIST</p> */}
        </div>
      </div>

      <button class="accordion">Section 2</button>
      <div class="panel">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>

      <button class="accordion">Section 3</button>
      <div class="panel">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
}

export default ListUsers;
