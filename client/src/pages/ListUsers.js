import data from "../mock-data.json";
import React from "react";
import { useEffect, useState, Fragment } from "react";
import { nanoid } from "nanoid";
// import Header from ".../";
import Header from "../components/Header/Header";
import EditUser from "../components/user/EditUser";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRow from "../components/EditableRow";

function ListUsers() {
  const [users, setUsers] = useState(null);
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    team: "",
    role: "",
  });

  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    team: "",
    role: "",
  });

  const [editContactId, setEditContactId] = useState(null);

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
    for (var i = 0; i < 6; i++) element.removeChild(element.lastElementChild);

    // append a form into the div as the last child element that will include two selections plus two buttons
    // 	1. role selection
    // 	2. team selection
    // 	3. accept button that calls changeUserData() which will make changes to Mongo
    // 	4. Cancel button to revert back to the previous changes (just call getUsers again)

    var form = document.createElement("form");
    var select1 = document.createElement("select");
    var s1_option1 = document.createElement("option");
    var s1_option2 = document.createElement("option");
    var s1_option3 = document.createElement("option");

    select1.appendChild(s1_option1);
    select1.appendChild(s1_option2);
    select1.appendChild(s1_option3);
    form.appendChild(select1);

    s1_option1.value = "Option 1";
    s1_option1.label = "Option 1";
    
    s1_option2.value = "Option 2";
    s1_option2.label = "Option 2";

    s1_option3.value = "Option 3";
    s1_option3.label = "Option 3";

    element.appendChild(form);
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

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  // This is handling the save button even though it's not attached to it. Instead, it's attached to the form itself within this file. 
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
      email: editFormData.email,
      team: editFormData.team,
      role: editFormData.role
    };

    const newContacts = [...users];

    const index = users.findIndex((contact) => contact._id === editContactId);

    newContacts[index] = editedContact;

    setUsers(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact._id);

    const formValues = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      team: contact.team,
      role: contact.role,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact._id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

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
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Team</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users ? (          
                users.map((contact) => ( 
                  <Fragment>
                    {editContactId === contact._id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        contact={contact}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </Fragment>
                ))
              ) : (
                <h2>Users here</h2>
              )}
              {/* ))} */}
            </tbody>
          </table>
        </form>
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
