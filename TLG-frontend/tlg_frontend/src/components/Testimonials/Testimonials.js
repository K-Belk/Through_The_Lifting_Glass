import React from 'react'
import { Grid, Typography, Box, Container } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TimelineIcon from '@mui/icons-material/Timeline';
import ChatIcon from '@mui/icons-material/Chat';


const Testimonials = () => {
  const sectionItems = [
    {
      id: 1,
      icon: <ManageAccountsIcon sx={{ fontSize: 100 }} color="primary" />,
      image: 'https://pixy.org/download/103505/',
      sentence:
        'I used to use so many apps to follow my team, now I see everything in one place!',
    },
    {
      id: 2,
      icon: <TimelineIcon sx={{ fontSize: 100 }} color="primary" />,
      image: 'https://pixy.org/download/103505/',
      sentence:
        'I love being able to see my teams personal records in one place!',
    },
    {
      id: 3,
      icon: <ChatIcon sx={{ fontSize: 100 }} color="primary" />,
      image: 'https://pixy.org/download/103505/',
      sentence: 'I love being able to chat with my teammates!!',
    },
  ];
  return (
    <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
    <Grid container sx={{display: 'flex', justifyContent:'space-around'}}>
      {sectionItems.map((item) => (
        <Grid
          item
          xs={12}
          mt={10}
          md={3.5}
          minHeight={300}
          key={item.id}
          sx={{ backgroundColor:"lightgray", borderRadius: '30px'}}
          
        >
          <Container sx={{position:"relative", textAlign:'center'}}>
          <img src={item.image} alt='feature' style={{width: '100%', borderTopLeftRadius:'30px', borderTopRightRadius:'30px', height:'200px'}} value={item.sentence}/>
          <Typography sx ={{ fontFamily:'Alice', color:'black', position:'absolute',top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)' }}>{item.sentence}</Typography>
        </Container>
        </Grid>
      ))}
    </Grid>
  </Box>
  )
}

export default Testimonials