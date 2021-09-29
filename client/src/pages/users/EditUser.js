import React from 'react';
import {useForm} from 'react-hook-form';

function EditUser() {
    const {register, handleSubmit, erros } = useForm();

    return (
        <div>
            Edit User
        </div>
    )
}

export default EditUser;