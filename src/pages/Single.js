import React, { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import * as actions from '../redux/actions';
import { postsState$ } from '../redux/selectors';
import { createHtmlExcerpt, createPostUrl } from '../helpers';

const SinglePage = () => {
    const { postTitle } = useParams();
    const dispatch = useDispatch();
    const posts = useSelector(postsState$);
    const post = posts?.data || [];

    useLayoutEffect(() => {
        const fetchData = async () => {
            await Promise.all([dispatch(actions.getPosts.getPostsRequest())]);
        };

        fetchData();
    }, [dispatch]);

    const matchedPost = post.find((item) => {
        const match = item.post_title.match(/(.*?)\s*-/);
        if (match) {
            const sanitizedTitle = match[1].trim();
            return sanitizedTitle.toLowerCase().replace(/ /g, '-') === postTitle;
        } else {
            return item.post_title.toLowerCase().replace(/ /g, '-') === postTitle;
        }
    });

    if (!matchedPost) {
        return (
            <CircularProgress />
        );
    }

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    console.log(matchedPost);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <div role="presentation" onClick={handleClick}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="#"
                    >
                        {matchedPost.category.name || "Category Not Found"}
                    </Link>
                    <Typography color="text.primary">{matchedPost.post_title}</Typography>
                </Breadcrumbs>
            </div>
            <Grid container spacing={1}>
                <Grid item xs={6} md={8}>
                    <h1>{matchedPost.post_title}</h1>
                    <div className='content' dangerouslySetInnerHTML={{ __html: matchedPost.post_content }} />
                </Grid>
                <Grid item xs={6} md={4}>
                    xs=6 md=4
                </Grid>
            </Grid>
        </Box>
    );
};

export default SinglePage;
