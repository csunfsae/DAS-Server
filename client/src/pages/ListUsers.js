import { data } from "jquery";
import React from "react";
import { useEffect, useState } from "react";
// import Header from ".../";
import Header from "../components/Header/Header";
import EditUser from "../components/user/EditUser";

function ListUsers() {
  const [users, setUsers] = useState(null);
  // const [changeUser, setChangeUser] = useState(null);
  // const [deleteUser, setDeleteUser] = useState(null);
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

  const removeUser = (user) => {
    fetch("http://localhost:4000/api/v1/auth/delete", {
      method: "POST",
      body: JSON.stringify({
        userId: user._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Users was removed");
        getUsers();
        console.log(users);
      });
  };

  const changeElement = (index) => {
    // getdocumentid for user to select the right div
    var element = document.getElementById(index);

    // remove the last 4 children elements from the div
    for (var i = 0; i < 4; i++) element.removeChild(element.lastElementChild);

    // append a form into the div as the last child element that will include two selections plus two buttons
    // 	1. role selection
    // 	2. team selection
    // 	3. accept button that calls changeUserData() which will make changes to Mongo
    // 	4. Cancel button to revert back to the previous changes (just call getUsers again)

    var form = document.createElement("form");
    var select1 = document.createElement("select");
    var s1_option1 = document.createElement("option");
    var s1_option2 = document.createElement("option");
    var s1_option3;

    element.appendChild(form);
  };

  // const updateUsers = await fetch("http://localhost:4000/api/v1/auth/update", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     // userId: ,
  //     // team: ,
  //     // role:
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // if (updateUsers.status === 200) {
  //   window.location.reload(true);
  // } else {
  //   alert("User not found. Please sign up or try a different user.");
  // }

  const test = (id) => {
    // console.log("id here" + id);
    console.log("Changing user");
    // setChangeUser(id);
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

  // useEffect(() => {
  //   console.log("Ran useffect successfully when changeUser value changed");
  //   if (changeUser) console.log(changeUser._id);
  // }, [changeUser]);

  // useEffect(() => {
  //   if (deleteUser) {
  //     console.log("Going in");
  //     console.log(deleteUser._id);
  //   }
  // }, [deleteUser]);

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
            users.map((user, index) => (
              <div className="user" id={index}>
                <span>
                  {user.firstName} {user.lastName}
                </span>
                <span>{user.email}</span>
                <span>{user.role}</span>
                <span>{user.team}</span>
                <button onClick={() => changeElement(index)}>Edit</button>
                <button onClick={() => removeUser(user)}>Delete</button>
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
