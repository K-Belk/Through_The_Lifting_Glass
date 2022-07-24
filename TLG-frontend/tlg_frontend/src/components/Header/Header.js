import { Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import AddPost from "../AddaPost/AddPost";


const Header = () => {
  return (
  
      <Box>
    <Container sx={{backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: 'url(https://images.unsplash.com/photo-1633680266538-70b2320747f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fHdoaXRlYm9hcmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60)', height: '405px' }} >
    <Typography sx ={{ fontFamily:'Alice-Regular', color:'black', position:'absolute',top: '25%',
  left: '50%',
  transform: 'translate(-50%, -90%)', fontSize:'120px', mt:9 }}>Off The Board</Typography>
  
    </Container>
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: '100px', position:'absolute',top: '25%',
  left: '50%',transform: 'translate(-50%, -50%)' }}> 
    <AddPost />
    </Box>
    </Box>
  
    

  )
}

export default Header