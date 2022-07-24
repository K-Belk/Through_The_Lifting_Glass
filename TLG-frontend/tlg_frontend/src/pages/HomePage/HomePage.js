import {Container, Typography, Box }  from '@mui/material'
import React from 'react'
import Hero from '../../components/Hero/Hero'
import Section from '../../components/Section/Section'
import './HomePage.css';

const HomePage = () => {
  return (
    <div id='container'>
      <div className='content'>
        {/* <Box alignItems="center" justifyContent="center" sx={{
             backgroundColor: "lightgray", mb:'150px', mr:'150px', ml:'150px'
        }}>
          <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2VpZ2h0JTIwbGlmdGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80" width="1300" height="800" alt="woman lifting weights" />
        </Box> */}
        <Container sx={{
            backgroundColor: "lightgray", mt: '150px', borderRadius: '30px'
        }}>
          <Hero />
        </Container>
      </div>
      <div className ='content'>
        <Container style={{display: 'flex', justifyContent: 'center'}}>
          <Typography variant="h3" sx={{color:'whitesmoke'}}>
            What can TLG do for you and your team?
          </Typography>
        </Container>
        <Section />
      </div>
    </div>
  )
}

export default HomePage