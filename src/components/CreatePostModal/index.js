import React from 'react';
import { Modal } from '@mui/material';
import {useSelector} from "react-redux";
import { modalState$ } from '../../redux/selectors';
import useStyle from "./style";

export default function CreatePostModal() {
  const {isShow} = useSelector(modalState$);
  const classes = useStyle();
  const body = (
    <div className={classes.paper}>
      <h2>hihhihihih</h2>
    </div>
  );
  return (
    // onClose={{}}
    <Modal open={isShow} >
      {body}
    </Modal>
  )
}

