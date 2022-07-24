import React from 'react';
import { Grid, Typography, Box, Container } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TimelineIcon from '@mui/icons-material/Timeline';
import ChatIcon from '@mui/icons-material/Chat';


const Section = () => {


  const sectionItems = [
    {
      id: 1,
      icon: <ManageAccountsIcon sx={{ fontSize: 100 }} color="primary" />,
      image: 'https://media.istockphoto.com/photos/cross-training-coach-gives-instructions-to-the-gym-workout-class-picture-id539958990?k=20&m=539958990&s=170667a&w=0&h=xTFL3aBzeMJTAEhezu058BcWrMFuLaBvel2gnEfgHJo=',
      sentence:
        'Providing coaches tools to help them manage their athletes and their teams.',
    },
    {
      id: 2,
      icon: <TimelineIcon sx={{ fontSize: 100 }} color="primary" />,
      image: 'https://i.pinimg.com/originals/97/0f/3e/970f3ea6525a4810461ea43c56f0e35f.jpg',
      sentence:
        'Allows athletes the ability to track personal lift progress and coachs to see team progress.',
    },
    {
      id: 3,
      icon: <ChatIcon sx={{ fontSize: 100 }} color="primary" />,
      image: 'https://cdn.arstechnica.net/wp-content/uploads/2021/06/36-1.jpg',
      sentence: 'Foster team building by providing in-app communication!',
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
            sx={{ backgroundColor:"#141010", borderRadius: '30px'}}
            
          >
            <Container>
            <img src={item.image} alt='feature' style={{width: '100%', borderTopLeftRadius:'30px', borderTopRightRadius:'30px', height:'200px'}}/>
            <Typography sx ={{ fontFamily:'Alice', color:'whitesmoke'}}>{item.sentence}</Typography>
          </Container>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Section;