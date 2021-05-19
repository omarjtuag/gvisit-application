import React from 'react';
import { useParams } from 'react-router-dom';
import User from '../../../components/screens/dashboard/user/Users';
import Create from '../../../components/screens/dashboard/user/Create';
import Update from '../../../components/screens/dashboard/user/Update';

export const ReadUser = () => {
    return (
        <User />
    );
}

export const CreateUser = () => {
    return (
        <Create />
    );
}

export const UpdateUser = () => {
    let { id } = useParams();
    return (
        <Update search={id} />
    );
}