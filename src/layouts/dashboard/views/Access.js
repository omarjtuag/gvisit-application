import React from 'react';
import Selection from '../../../components/screens/dashboard/access/Selection';
import Already from '../../../components/screens/dashboard/access/AlreadySelection';
import Entry from '../../../components/screens/dashboard/access/Entry';
import Exit from '../../../components/screens/dashboard/access/Exit';
import Firsttime from '../../../components/screens/dashboard/access/Firsttime';
import Update from '../../../components/screens/dashboard/access/Update';

export const ReadSelection = () => {
    return (
        <Selection />
    );
};

export const ReadAlready = () => {
    return (
        <Already />
    );
};

export const ReadEntry = () => {
    return (
        <Entry />
    );
};

export const ReadExit = () => {
    return (
        <Exit />
    );
};

export const ReadFirsttime = () => {
    return (
        <Firsttime />
    );
};

export const ReadUpdate = () => {
    return (
        <Update />
    );
};