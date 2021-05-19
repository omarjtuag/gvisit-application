import React from 'react';
import { useParams } from 'react-router-dom';
import Motive from '../../../components/screens/dashboard/motive/Motives';
import Create from '../../../components/screens/dashboard/motive/Create';
import Update from '../../../components/screens/dashboard/motive/Update';

export const ReadMotive = () => {
    return (
        <Motive />
    );
}

export const CreateMotive = () => {
    return (
        <Create />
    );
}

export const UpdateMotive = () => {
    let { id } = useParams();
    return (
        <Update search={id} />
    );
}