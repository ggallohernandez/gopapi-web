import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import HttpsIcon from '@mui/icons-material/Https';
import { Box, Button, FormControl, InputAdornment, Paper, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

export default function NewCertificateForm() {
  const { getAccessTokenSilently } = useAuth0();
  const [domainVerification, setDomainVerification] = useState(false);

  const handleSubmit = async () => {
    const domain = process.env.REACT_APP_API_BASE_URL as string
    
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/`,
        scope: "",
      });

      /*const requestDomainVerification = `https://${domain}/domain/request_verification`;

      const response = await fetch(requestDomainVerification, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { domain_verification } = await response.json();*/

      setDomainVerification(true);
    } catch (e) {
      console.log(e.message);
    }

  };

  return (
    <React.Fragment>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
      >
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Enter website to secure (example: domain.com)"
            inputProps={{ 'aria-label': 'Enter website to secure (example: domain.com)' }}
            startAdornment={
                <InputAdornment position="start">
                  <HttpsIcon /> Secure | https://
                </InputAdornment>
              }
            endAdornment={
              <InputAdornment position="end">
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Button variant="contained" onClick={() => handleSubmit()}>Create SSL Certificate</Button>
              </InputAdornment>
            }
          />
        </FormControl>
      </Paper>
      {domainVerification && (
        <Paper
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
        >
          <Typography component="h2">
            Domain ownership verification
          </Typography>
          <Typography>
            To verify your domain using a TXT record, please follow the steps below:

            Sign in to your DNS provider, typically the registrar of your domain.
            Navigate to the section where DNS records are managed.
            Add the following TXT record:

            Value: gopapi-site-verification=pdmY5PzaBwtYgsztkZL2LZ7wxvy26onb
          </Typography>
        </Paper>
      )}
    </React.Fragment>
  );
}