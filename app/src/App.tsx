import React, { Profiler } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Container from '@mui/material/Container';
import MenuAppBar from './MenuAppBar';
import NewCertificateForm from './NewCertificateForm';
import { Box } from '@mui/system';

function App() {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Box mt={2}>
          <MenuAppBar />
        </Box>
        {isAuthenticated && (<Box mt={2}><NewCertificateForm /></Box>)}
      </Container>
    </React.Fragment>
  );
}

export default App;
