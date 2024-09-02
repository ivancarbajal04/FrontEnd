import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        try {
            await axios.post('http://localhost:8000/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation
            });
            navigate('/'); // Redirect to home or another page after successful registration
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                const errors = error.response.data.errors;
                const message = Object.values(errors).flat().join(' ');
                setErrorMessage(message || 'Error de registro. Por favor, intenta de nuevo.');
            } else {
                setErrorMessage('Error inesperado. Por favor, intenta de nuevo.');
            }
            console.error(error); // Log the error for debugging
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
                <form onSubmit={handleRegister} style={{ width: '100%' }}>
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Contraseña"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        inputProps={{ minLength: 8 }}
                    />
                    <TextField
                        label="Confirmar Contraseña"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
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
