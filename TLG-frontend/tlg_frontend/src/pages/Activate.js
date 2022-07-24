import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { activate } from "../actions/auth";
import { Button, Typography, Container, Box } from "@mui/material";


const Activate = ({ activate }) => {
  const [activated, setActivated] = useState(false);
  const { uid, token } = useParams();

  const activate_account = e => {    
    activate(uid, token)
    setActivated(true)
  };

  if (activated) {
    
    return <Navigate to='/' />
  }

  return (
    <Box className="container" >
      <Container 
        className='d-flex flex-column justify-content-center align-items-center'
        style={{ marginTop: '200px' }}
      >
        <Typography variant="h1">Verify your Account:</Typography>
        
        <Button
          onClick={activate_account}
          style={{ marginTop: '50px'}}
          type='button'
          className='btn btn-primary'
        >
          Activate
        </Button>
      </Container>
    </Box>
  );
};

export default connect(null, { activate })(Activate);