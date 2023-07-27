import React from "react";
import { Container, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'; 
import {useDispatch} from "react-redux"

import Header from "../components/Header";
import PostList from "../components/PostList";
import useStyles from "./style";
import { showModal } from "../redux/actions";
import CreatePostModal from "../components/CreatePostModal";

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const openCreatePostModal = React.useCallback(()=> {
    dispatch(showModal());
  },[dispatch]);
  
  return (
    <Container maxWidth="lg" className="container">
      <Header />
      <PostList/>
      <CreatePostModal/>
      <Fab color="primary" className={classes.fab} onClick={openCreatePostModal}>
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default HomePage;
