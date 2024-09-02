import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/');
    };

    return (
        <AppBar position="static" color="primary" sx={{ boxShadow: 3 }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    Hola, {userName}!
                </Typography>
                <Box>
                    <Button 
                        color="inherit" 
                        onClick={handleLogout}
                        startIcon={<ExitToAppIcon />}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            ml: 2,
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
