import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Typography, Button, Container} from "@mui/material";

import { Link } from "react-router-dom";
import "../../../src/index.css"

const Hero = () => {
  
  const {isAuthenticated: auth, user: currentUser} = useSelector((state) => state.auth);


  return (
    <Box sx={{display:'flex'}}>
      <Grid container sx={{display:'flex'}}>
        <Grid item >
         <Container>
          <Typography variant="h1" sx={{marginLeft: "60px", justify:'center',alignItems:'center',fontFamily:'Alice-Regular', color:'whitesmoke', fontSize:'8rem'}}>Through the Lifting Glass</Typography>
        </Container>
        <Container>
          <Typography variant="h5" sx={{textAlign: "center", fontFamily:'Alice', color:'whitesmoke'}}>High School Weightlifting team management for coaches and athletes </Typography>
        </Container>
        {!auth && (
          <Container sx={{display:'flex', justifyContent: 'center', alignItems:'center', mt:'5rem'}}>
          <Link
            style={{ textDecoration: "none", color: "white", margin: "5px" }}
            to="/signup"
          >
            <Button
              variant="contained"
              sx={{width: "250px", fontSize: "20px", fontFamily: "Alice-Regular", backgroundColor: "black"}}
            >
              Register
            </Button>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/signin"
          >
            <Button
              variant="contained"
              color="primary"
              sx={{width: "250px", fontSize: "20px", fontFamily: "Alice-Regular", backgroundColor: "black" }}
            >
              Sign in
            </Button>
          </Link>
        </Container>
        )}
        {currentUser && currentUser.account_type === 2 ? (
          <Container sx={{display:'flex', justifyContent: 'center', alignItems:'center', mt:'5rem'}}>
            <Link
              style={{ textDecoration: "none", color: "white", margin: "5px" }}
              to="/coach-dashboard"
            >
              <Button
                variant="contained"
                sx={{width: "400px", fontSize: "20px", fontFamily: "Alice-Regular", backgroundColor: "black" }}
              >
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8oLGLgrs66HQEtuLz4X2p2R9IxZtAjHqaqg&usqp=CAU" alt="White - White Rabbit Silhouette@nicepng.com" style={{width: '18%', height:'50px', backgroundColor:'black', marginRight:'20px'}}></img>
                Take me to the dashboard
              </Button>
            </Link>
          </Container>
        ): <></>}   
        {currentUser && currentUser.account_type === 1 ? (
          <Container sx={{display:'flex', justifyContent: 'center', alignItems:'center', mt:'5rem'}}>
           
            <Link
              style={{ textDecoration: "none", color: "white", margin: "5px" }}
              to="/athlete-dashboard"
            >
              <Button
                variant="contained"
                sx={{width: "400px", fontSize: "20px", fontFamily: "Alice-Regular", backgroundColor: "black" }}
              >
               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8oLGLgrs66HQEtuLz4X2p2R9IxZtAjHqaqg&usqp=CAU" alt="White - White Rabbit Silhouette@nicepng.com" style={{width: '18%', height:'50px', backgroundColor:'black', marginRight:'20px'}}></img>
                Take me to the dashboard
              </Button>
            </Link>
          </Container>
         ) : <></>}
        
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <img
            style={{
              objectFit: "contain",
              marginRight: "25px",
              marginTop: "-45px",
              paddingBottom: "10px",
              paddingTop: "7px",
              borderRadius: "30px",
            }}
            src={
              "https://images.unsplash.com/photo-1434754205268-ad3b5f549b11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnwxMDUyMjAxM3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
            }
            alt="Lifting Mirror"
          /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
