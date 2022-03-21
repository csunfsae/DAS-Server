import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a first name..."
          name="firstName"
          value={editFormData.firstName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a last name..."
          name="lastName"
          value={editFormData.lastName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="email"
          required="required"
          placeholder="Enter an email..."
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        {/* <input
          type="text"
          required="required"
          placeholder="Enter a team..."
          name="team"
          value={editFormData.team}
          onChange={handleEditFormChange}
        ></input> */}
        <select name="team" value={editFormData.team} onChange={handleEditFormChange}>
          <option value="Unassigned">Unassigned</option>
          <option value="Suspension">Suspension</option>
          <option value="Chasis">Chasis</option>
          <option value="Engine">Engine</option>
          <option value="Control">Control</option>
        </select>
      </td>
      <td>
        {/* <input
          type="text"
          required="required"
          placeholder="Enter an role"
          name="role"
          value={editFormData.role}
          onChange={handleEditFormChange}
        ></input> */}
        <select name="role" value={editFormData.role} onChange={handleEditFormChange}>
          <option value="Basic">Basic</option>
          <option value="Team Lead">Team Lead</option>
          <option value="Admin">Admin</option>
        </select>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;