import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { isAxiosError } from 'axios';
import { Button, Container, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setErrorMessage(null);

        try {
            await axiosInstance.post('/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.removeItem('token');
            navigate('/');
        } catch (error: any) {
            if (isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.error || 'Error al cerrar sesión. Por favor, intenta de nuevo.');
            } else {
                setErrorMessage('Error inesperado. Por favor, intenta de nuevo.');
            }
            console.error(error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Logout</Typography>
            {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMessage}
                </Alert>
            )}
            <Button variant="contained" color="primary" onClick={handleLogout}>
                Logout
            </Button>
        </Container>
    );
};

export default Logout;
