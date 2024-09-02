import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        try {
            const response = await axios.post('http://localhost:8000/login', {
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName', response.data.user.name);
            navigate('/Home'); 
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Error de autenticación. Por favor, intenta de nuevo.');
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
                <form onSubmit={handleLogin} style={{ width: '100%' }}>
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
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
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
                    ¿No tenes una cuenta?{' '}
                    <Link
                        component="button"
                        variant="body2"
                        onClick={handleRegisterRedirect}
                        sx={{ cursor: 'pointer' }}
                    >
                        Registrate acá
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
