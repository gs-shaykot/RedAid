import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import useRequests from '../Hooks/useRequests';

const DonationRqst = () => {

    const { AllRequests, isLoading, refetch } = useRequests()
    return (

    );
};

export default DonationRqst;