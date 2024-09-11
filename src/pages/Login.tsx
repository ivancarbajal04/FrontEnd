import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance'; // Importa axiosInstance
import { isAxiosError } from 'axios'; // Importa isAxiosError
import { TextField, Button, Container, Typography, Box, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ValidationErrors {
    [key: string]: string[]; // Estructura de los errores de validación
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors | null>(null); // Definido con tipo
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setValidationErrors(null);
    
        try {
            const response = await axiosInstance.post('/login', { // Usa axiosInstance
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName', response.data.user.name);
            navigate('/Home'); 
        } catch (error: any) {
            if (isAxiosError(error)) { // Usa isAxiosError para verificar el error
                if (error.response?.status === 422) {
                    // Mostrar errores de validación específicos
                    setValidationErrors(error.response.data.errors);
                } else {
                    setErrorMessage(error.response?.data?.error || 'Error de autenticación. Por favor, intenta de nuevo.');
                }
            } else {
                setErrorMessage('Error desconocido. Por favor, intenta de nuevo.');
            }
            console.error(error);
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/Register');
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                {errorMessage && (
                    <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                        {errorMessage}
                    </Alert>
                )}
                {validationErrors && (
                    <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                        {Object.entries(validationErrors).map(([field, messages]) => (
                            <div key={field}>
                                <strong>{field}</strong>: {messages.join(', ')}
                            </div>
                        ))}
                    </Alert>
                )}
                <form onSubmit={handleLogin} style={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    ¿No tienes una cuenta?{' '}
                    <Link
                        component="button"
                        variant="body2"
                        onClick={handleRegisterRedirect}
                        sx={{ cursor: 'pointer' }}
                    >
                        Regístrate aquí
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
