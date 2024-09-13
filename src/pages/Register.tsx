import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { isAxiosError } from 'axios';
import { TextField, Button, Container, Typography, Box, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ValidationErrors {
    [key: string]: string[];
}

const Register: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setValidationErrors(null);

        try {
            await axiosInstance.post('/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation
            });
            navigate('/');
        } catch (error: any) {
            if (isAxiosError(error)) {
                if (error.response?.status === 422) {
                    setValidationErrors(error.response.data.errors);
                } else {
                    setErrorMessage(error.response?.data?.error || 'Error de registro. Por favor, intenta de nuevo.');
                }
            } else {
                setErrorMessage('Error inesperado. Por favor, intenta de nuevo.');
            }
            console.error(error);
        }
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
                    Registro
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
                <form onSubmit={handleRegister} style={{ width: '100%' }}>
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                        label="Contraseña"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirmar Contraseña"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Registrar
                    </Button>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        ¿Ya tienes una cuenta?{' '}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate('/')}
                            sx={{ cursor: 'pointer' }}
                        >
                            Inicia sesión
                        </Link>
                    </Typography>
                </form>
            </Box>
        </Container>
    );
};

export default Register;
