import React from 'react';
import './Home.scss';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { AppBar, Typography } from '@mui/material';

const Home = () => {
  return (
    <>
        <Container>
            
            <Box className="banner-wrapper" sx={{ bgcolor: '#ffffff', height: '100vh' }}>
                <Typography className="banner-title" variant="h2">
                    Hellooo
                </Typography>
            </Box>
        </Container>
    </>
  )
}

export default Home;
