import React from 'react';
import moment from "moment";

import { Avatar, Card, CardActions, CardHeader, CardMedia, IconButton, Typography, CardContent } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Post({post}) {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar>A</Avatar>}
        title={post.author}
        subheader={moment(post.updatedAt).format("HH:MM MM DD, YYYY ")}
        action={<IconButton><MoreVertIcon /></IconButton>}
      />
      <CardMedia
        image="URL_OF_YOUR_IMAGE_HERE" // Replace with the actual URL of the image
        title="Title"
      />
      <CardContent>
        <Typography variant="h4" color="textPrimary">{post.title}</Typography>
        <Typography variant="body2" component="p" color="textSecondary">{post.content}</Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <FavoriteIcon />
          <Typography component="span" color="textSecondary">
            {post.likeCount}
          </Typography>
        </IconButton>
      </CardActions>
    </Card>
  )
}
