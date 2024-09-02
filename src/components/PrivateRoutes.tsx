import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './navbar';

interface PrivateRouteProps {
    element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Navbar />
            {element}
        </>
    );
};

export default PrivateRoute;
